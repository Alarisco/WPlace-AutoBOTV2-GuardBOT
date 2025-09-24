// Módulo modularizado de funcionalidades Guard extraídas de index.js
// Responsable de manejo de guardData, análisis headless, preview y aplicación de config

import { log } from "../../core/logger.js";
import { analyzeAreaPixels, detectAvailableColors } from "../../guard/processor.js";
import { trackEvent } from "../../core/metrics/client.js";
import { getPixelsByPattern } from "../../guard/patterns.js";
import { findAndClickPaintButton } from "../../core/dom.js";
import { sleep } from "../../core/timing.js";

// Estado interno del módulo (no sustituye a window.guardState, lo complementa)
const guardRuntime = {
  analysisInterval: null,
  intervalMs: 30000,
  lastManualRepair: 0,
  automationInterval: null,
  nextRepairEarliest: 0,
  nextCheckEarliest: 0
};

export function setAnalysisIntervalMs(ms) {
  guardRuntime.intervalMs = ms;
  if (guardRuntime.analysisInterval) {
    stopGuardAnalysisLoop();
  // El consumidor deberá reiniciar el loop proporcionado sendPreview explícitamente
  }
}

// Asegurar colores disponibles para análisis
export async function ensureGuardColors() {
  try {
    if (typeof window === 'undefined') return;
    const gs = window.guardState;
    if (!gs) return;
    if (gs.availableColors && gs.availableColors.length > 0) return; // ya listos
    const cols1 = detectAvailableColors();
    if (cols1.length > 0) { gs.availableColors = cols1; return; }
    if (findAndClickPaintButton()) {
      await sleep(2500);
      const cols2 = detectAvailableColors();
      if (cols2.length > 0) { gs.availableColors = cols2; return; }
    }
  } catch (e) {
    log('⚠️ ensureGuardColors fallo:', e);
  }
}

// Aplicar configuración recibida desde servidor
export async function applyGuardConfig(fullConfig, changed, { onIntervalChange } = {}) {
  try {
    if (typeof window === 'undefined') return;
    const { guardState } = await import('../../guard/config.js');
    if (!guardState.config) guardState.config = {};
    const mapping = {
      protectionPattern: 'protectionPattern',
      preferColor: 'preferColor',
      preferredColorIds: 'preferredColorIds',
      excludeColor: 'excludeColor',
      excludedColorIds: 'excludedColorIds',
      spendAllPixelsOnStart: 'spendAllPixelsOnStart',
      minChargesToWait: 'minChargesToWait',
      pixelsPerBatch: 'pixelsPerBatch',
      randomWaitTime: 'randomWaitTime',
      randomWaitMin: 'randomWaitMin',
      randomWaitMax: 'randomWaitMax',
      watchMode: 'watchMode'
    };
    Object.keys(mapping).forEach(k=>{ if (k in fullConfig) guardState[mapping[k]] = fullConfig[k]; });
    if (typeof fullConfig.colorThreshold === 'number') guardState.config.colorThreshold = fullConfig.colorThreshold;
    if (typeof fullConfig.colorComparisonMethod === 'string') {
      const method = fullConfig.colorComparisonMethod.toLowerCase();
      if (!guardState.config) guardState.config = {};
      guardState.config.colorComparisonMethod = (method === 'lab') ? 'lab' : 'rgb';
    }
    if (fullConfig.randomWaitTime && typeof fullConfig.randomWaitMin === 'number' && typeof fullConfig.randomWaitMax === 'number') {
      const avg = (fullConfig.randomWaitMin + fullConfig.randomWaitMax)/2;
      const ms = Math.max(5000, avg * 1000);
      onIntervalChange && onIntervalChange(ms);
    }
    log('⚙️ Guard config aplicada (modular)');
  } catch(e){ log('⚠️ Error aplicando guardConfig (modular):', e); }
}

// Procesar guardData y reconstruir estado
export async function handleGuardData(message, { setModeIfNeeded, sendPreview, startAnalysisLoop }) {
  try {
    if (!message.guardData) return;
    const { guardState } = await import('../../guard/config.js');
    const data = message.guardData;
    
    // Detectar si los datos fueron procesados por el masterserver
    const isProcessed = data.processed === true;
    const originalFormat = data.originalFormat || 'unknown';
    
    if (isProcessed) {
      log(`🛡️ Recibiendo guardData procesado (formato original: ${originalFormat})`);
    }
    
    const area = data.protectionData?.area || data.protectionArea || data.area;
    if (!area) { log('❌ guardData sin área de protección'); return; }
    
    guardState.protectionArea = {
      x1: area.x1 ?? area.x ?? area.left ?? 0,
      y1: area.y1 ?? area.y ?? area.top ?? 0,
      x2: area.x2 ?? (area.x1 ?? area.x ?? 0) + (area.width ?? 0),
      y2: area.y2 ?? (area.y1 ?? area.y ?? 0) + (area.height ?? 0)
    };
    
    const originalPixelsArr = data.originalPixels || data.protectionData?.originalPixels || [];
    guardState.originalPixels = new Map();
    
    for (const p of originalPixelsArr) {
      const key = p.key || `${p.globalX ?? p.x},${p.globalY ?? p.y}`;
      
      // Manejar píxeles transparentes correctamente (r, g, b pueden ser null)
      let r = p.r, g = p.g, b = p.b;
      const colorId = p.colorId || p.id || 0;
      
      // Si es transparente (colorId = 0) y tiene valores RGB null, mantenerlos como null
      if (colorId === 0 && (r === null || g === null || b === null)) {
        r = null;
        g = null; 
        b = null;
      } else if (r === null || g === null || b === null) {
        // Si no es transparente pero tiene valores null, usar 0 por defecto
        r = r ?? 0;
        g = g ?? 0;
        b = b ?? 0;
      }
      
      // Precalcular LAB para comparación futura si se activa 'lab' (solo si RGB no es null)
      const entry = { r, g, b, colorId };
      if (r !== null && g !== null && b !== null) {
        entry.lab = rgbToLabArray(r, g, b);
      } else {
        entry.lab = null; // No calcular LAB para píxeles transparentes
      }
      
      guardState.originalPixels.set(key, entry);
    }
    
    log(`🛡️ GuardData recibido (modular): area=(${guardState.protectionArea.x1},${guardState.protectionArea.y1})→(${guardState.protectionArea.x2},${guardState.protectionArea.y2}) px=${guardState.originalPixels.size}`);
    
    if (isProcessed) {
      log(`📦 Datos procesados desde formato ${originalFormat} - ${guardState.originalPixels.size} píxeles expandidos`);
    }
    
    guardState.changes = new Set();
    guardState.lastCheck = Date.now();
    if (setModeIfNeeded) await setModeIfNeeded();
    await ensureGuardColors();
    if (typeof window !== 'undefined') window.guardState = guardState;
    const preview = await getPreviewData();
    if (preview && sendPreview) sendPreview(preview, { immediate: true });
    if (startAnalysisLoop) startAnalysisLoop();
  } catch (e) {
    log('❌ Error procesando guardData (modular):', e);
  }
}

// Generar datos de preview (similar a versión inline)
export async function getPreviewData() {
  if (typeof window === 'undefined' || !window.guardState) return null;
  const guardState = window.guardState;
  if (!guardState.originalPixels || guardState.originalPixels.size === 0) return null;

  const analysis = { correctPixels: 0, incorrectPixels: 0, missingPixels: 0 };
  const correctPixelsList = [], incorrectPixelsList = [], missingPixelsList = [], originalPixelsList = [];
  const TOTAL = guardState.originalPixels.size;
  const MAX_DETAILED_PIXELS = 2000000; // Aumentado para datasets muy grandes (2M píxeles)
  const MAX_ARRAY_LENGTH = 1000000; // Sin límite práctico para visualización completa
  const DO_FULL_DETAIL = TOTAL <= MAX_DETAILED_PIXELS;
  let truncated = false; let sampled = 0;
  try {
    let currentPixels = null;
    if (DO_FULL_DETAIL) {
      currentPixels = await analyzeAreaPixels(guardState.protectionArea);
    }
    for (const [key, originalPixel] of guardState.originalPixels) {
      const [x, y] = key.split(',').map(Number);
      if (originalPixelsList.length < MAX_ARRAY_LENGTH) originalPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
      if (DO_FULL_DETAIL && currentPixels) {
        const cur = currentPixels.get(key);
        if (!cur) {
          analysis.missingPixels++; if (missingPixelsList.length < MAX_ARRAY_LENGTH) missingPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b }); else truncated = true;
        } else {
          const rDiff = Math.abs(originalPixel.r - cur.r);
          const gDiff = Math.abs(originalPixel.g - cur.g);
          const bDiff = Math.abs(originalPixel.b - cur.b);
          if (Math.max(rDiff, gDiff, bDiff) <= 10) {
            analysis.correctPixels++; if (correctPixelsList.length < MAX_ARRAY_LENGTH) correctPixelsList.push({ x, y, r: cur.r, g: cur.g, b: cur.b }); else truncated = true;
          } else {
            analysis.incorrectPixels++; if (incorrectPixelsList.length < MAX_ARRAY_LENGTH) incorrectPixelsList.push({ x, y, r: cur.r, g: cur.g, b: cur.b, originalR: originalPixel.r, originalG: originalPixel.g, originalB: originalPixel.b }); else truncated = true;
          }
        }
      } else if (!DO_FULL_DETAIL) {
        // Para datasets grandes, crear muestras representativas basadas en análisis previo
        if (guardState.lastAnalysis?.details) {
          const details = guardState.lastAnalysis.details;
          if (details.correct && details.correct.has && details.correct.has(key)) {
            analysis.correctPixels++; 
            if (correctPixelsList.length < MAX_ARRAY_LENGTH) {
              correctPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            }
          } else if (details.incorrect && details.incorrect.has && details.incorrect.has(key)) {
            analysis.incorrectPixels++;
            if (incorrectPixelsList.length < MAX_ARRAY_LENGTH) {
              incorrectPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            }
          } else if (details.missing && details.missing.has && details.missing.has(key)) {
            analysis.missingPixels++;
            if (missingPixelsList.length < MAX_ARRAY_LENGTH) {
              missingPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            }
          }
        }
      }
      sampled++; if (!DO_FULL_DETAIL && sampled >= 10000) break; // Aumentado de 3000 a 10000
    }
    if (!DO_FULL_DETAIL) {
      // Para datasets grandes, usar análisis previo si existe y generar muestras
      if (guardState.lastAnalysis?.summary) {
        analysis.correctPixels = guardState.lastAnalysis.summary.correct;
        analysis.incorrectPixels = guardState.lastAnalysis.summary.incorrect;
        analysis.missingPixels = guardState.lastAnalysis.summary.missing;
        
        // Generar muestras representativas para visualización basadas en lastAnalysis.details
        if (guardState.lastAnalysis.details) {
          const details = guardState.lastAnalysis.details;
          const SAMPLE_LIMIT = MAX_ARRAY_LENGTH; // Usar el mismo límite alto
          
          // Muestra de píxeles correctos
          if (details.correct && typeof details.correct.keys === 'function') {
            let correctSampled = 0;
            for (const key of details.correct.keys()) {
              if (correctSampled >= SAMPLE_LIMIT) break;
              const [x, y] = key.split(',').map(Number);
              const originalPixel = guardState.originalPixels.get(key);
              if (originalPixel) {
                correctPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
                correctSampled++;
              }
            }
          }
          
          // Muestra de píxeles incorrectos  
          if (details.incorrect && typeof details.incorrect.keys === 'function') {
            let incorrectSampled = 0;
            for (const key of details.incorrect.keys()) {
              if (incorrectSampled >= SAMPLE_LIMIT) break;
              const [x, y] = key.split(',').map(Number);
              const originalPixel = guardState.originalPixels.get(key);
              if (originalPixel) {
                incorrectPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
                incorrectSampled++;
              }
            }
          }
          
          // Muestra de píxeles faltantes
          if (details.missing && typeof details.missing.keys === 'function') {
            let missingSampled = 0;
            for (const key of details.missing.keys()) {
              if (missingSampled >= SAMPLE_LIMIT) break;
              const [x, y] = key.split(',').map(Number);
              const originalPixel = guardState.originalPixels.get(key);
              if (originalPixel) {
                missingPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
                missingSampled++;
              }
            }
          }
        } else {
          // Fallback: generar muestras aleatorias distribuyendo por categorías estimadas
          const sampleSize = Math.min(MAX_ARRAY_LENGTH, sampled);
          const correctRatio = analysis.correctPixels / TOTAL;
          const incorrectRatio = analysis.incorrectPixels / TOTAL;
          const missingRatio = analysis.missingPixels / TOTAL;
          
          let sampledCount = 0;
          for (const [key, originalPixel] of guardState.originalPixels) {
            if (sampledCount >= sampleSize) break;
            const [x, y] = key.split(',').map(Number);
            const rand = Math.random();
            
            if (rand < correctRatio && correctPixelsList.length < MAX_ARRAY_LENGTH) {
              correctPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            } else if (rand < correctRatio + incorrectRatio && incorrectPixelsList.length < MAX_ARRAY_LENGTH) {
              incorrectPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            } else if (rand < correctRatio + incorrectRatio + missingRatio && missingPixelsList.length < MAX_ARRAY_LENGTH) {
              missingPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
            }
            sampledCount++;
          }
        }
      }
      analysis.estimated = true; analysis.sampled = sampled; analysis.total = TOTAL; analysis.note = 'Preview resumida (estimada)';
    }
    if (truncated) analysis.truncated = true;
  } catch (err) {
    console.warn('Error analyzing pixels for preview (modular)', err);
    analysis.correctPixels = guardState.originalPixels.size - (guardState.changes ? guardState.changes.size : 0);
    analysis.incorrectPixels = guardState.changes ? guardState.changes.size : 0;
    analysis.missingPixels = 0; analysis.truncated = true; analysis.fallback = true;
  }

  const totalPixels = guardState.originalPixels.size;
  // Eliminar límites artificiales para permitir visualización completa de datasets grandes
  // const VISUALIZATION_LIMIT = 15000; // REMOVIDO - sin límites artificiales
  // No aplicar truncado automático para datasets grandes

  return {
    protectedArea: guardState.protectionArea,
    analysis,
    originalPixels: originalPixelsList,
    correctPixelsList,
    incorrectPixelsList,
    missingPixelsList,
    changes: guardState.changes ? Array.from(guardState.changes) : [],
    totalPixels,
    lastCheck: guardState.lastCheck || Date.now(),
  isVirtualArea: guardState.isVirtualArea || false,
  method: (guardState.config && guardState.config.colorComparisonMethod) || 'rgb',
  availableColors: Array.isArray(guardState.availableColors)
      ? guardState.availableColors.map(c => ({ id: c.id ?? c.colorId ?? 0, r: c.r, g: c.g, b: c.b }))
      : []
  };
}

// Bucle de análisis headless
export function startGuardAnalysisLoop({ sendPreview } = {}) {
  if (guardRuntime.analysisInterval) return;
  if (typeof window === 'undefined' || !window.guardState) return;
  log('🔄 Iniciando loop análisis Guard (modular)');
  guardRuntime.analysisInterval = window.setInterval(() => {
    performGuardAnalysis({ sendPreview }).catch(e=>log('⚠️ Error análisis Guard modular:', e));
  }, guardRuntime.intervalMs);
  performGuardAnalysis({ sendPreview }).catch(()=>{});
}

export function stopGuardAnalysisLoop() {
  if (guardRuntime.analysisInterval) {
  window.clearInterval(guardRuntime.analysisInterval);
    guardRuntime.analysisInterval = null;
  }
}

// ===== Automación avanzada: monitoreo de cargas y disparo de reparaciones =====
export function startGuardAutomation({ sendPreview, sendRepairSuggestion } = {}) {
  if (guardRuntime.automationInterval) return;
  if (typeof window === 'undefined' || !window.guardState) return;
  log('🤖 Iniciando automatización Guard (monitoreo+auto-repair)');
  // Análisis base arranca también si no está
  if (!guardRuntime.analysisInterval) startGuardAnalysisLoop({ sendPreview });
  guardRuntime.automationInterval = window.setInterval(async () => {
    try {
      const gs = window.guardState;
      if (!gs) return;
      const now = Date.now();
      // Reglas de espera de cargas
      const minCharges = gs.minChargesToWait || 0;
      const currentCharges = gs.currentCharges || 0;
      if (currentCharges < minCharges) {
        return; // esperar recarga
      }
      // Random wait si habilitado
      if (gs.randomWaitTime && gs.randomWaitMin != null && gs.randomWaitMax != null) {
        if (now < guardRuntime.nextRepairEarliest) return;
      }
      // Si hay análisis reciente con diffs
      const diffs = gs.lastAnalysis?.diffsSample || [];
      if (!diffs.length) return;
      // Ejecutar reparación automática (sólo si no watchMode)
      if (!gs.watchMode) {
        const auto = await manualRepair({}, { sendPreview });
        if (auto && auto.pixels && auto.pixels.length) {
          sendRepairSuggestion && sendRepairSuggestion(auto);
          try { trackEvent('auto_repair_trigger', { botVariant: 'slave-guard', metadata: { pixels: auto.pixels.length, pattern: auto.patternUsed } }); } catch {}
          // Ajustar próximo tiempo de reparación si randomWait activo
          if (gs.randomWaitTime) {
            const minMs = Math.max(1000, (gs.randomWaitMin || 5) * 1000);
            const maxMs = Math.max(minMs, (gs.randomWaitMax || 15) * 1000);
            const wait = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
            guardRuntime.nextRepairEarliest = Date.now() + wait;
          } else {
            guardRuntime.nextRepairEarliest = Date.now() + guardRuntime.intervalMs;
          }
        }
      }
    } catch (e) {
      log('⚠️ Error en automation loop Guard:', e);
    }
  }, 5000); // ciclo frecuente para reaccionar rápido
}

export function stopGuardAutomation() {
  if (guardRuntime.automationInterval) {
    window.clearInterval(guardRuntime.automationInterval);
    guardRuntime.automationInterval = null;
  }
}

// Limpia el estado de Guard y detiene bucles, dejando el sistema en modo observación (watch)
export async function clearGuardState() {
  try {
    if (typeof window === 'undefined') return;
    const { guardState } = await import('../../guard/config.js');
    // Detener bucles activos
    stopGuardAutomation();
    stopGuardAnalysisLoop();
    // Reset de estado principal
    guardState.originalPixels = new Map();
    guardState.changes = new Set();
    guardState.lastAnalysis = null;
    guardState.lastCheck = 0;
    guardState._spentAllOnce = false;
    // Mantener availableColors por si seguimos observando; limpiar área protegida
    guardState.protectionArea = null;
    // Forzar modo observación para quedar idle (no autopintar)
    guardState.watchMode = true;
    // Notificar en consola
    log('🧹 Guard state cleared (modular): reset de pixeles/analisis y watchMode=true');
    return true;
  } catch (e) {
    log('⚠️ Error al limpiar Guard state (modular):', e);
    return false;
  }
}

// Análisis diferencial
export async function performGuardAnalysis({ sendPreview, force } = {}) {
  if (typeof window === 'undefined' || !window.guardState) return;
  const guardState = window.guardState;
  if (!guardState || !guardState.originalPixels || guardState.originalPixels.size === 0) return;
  if (guardState.watchMode && !force) return; // no recalcular en watchMode salvo que se fuerce
  await ensureGuardColors();
  if (!guardState.availableColors || guardState.availableColors.length === 0) { log('⚠️ Análisis omitido: sin colores'); return; }
  const start = Date.now();
  let currentPixels;
  try {
    currentPixels = await analyzeAreaPixels(guardState.protectionArea);
  } catch (e) { log('⚠️ Error analizando área (modular):', e); return; }
  const total = guardState.originalPixels.size;
  const diffs = [];
  const MAX_DIFFS = 5000;
  // Sin límites artificiales para preview completo
  const PREVIEW_LIMIT = 1000000; // Límite muy alto para permitir datasets grandes
  const originalPixelsList = [];
  const correctPixelsList = [];
  const incorrectPixelsList = [];
  const missingPixelsList = [];
  let correct = 0, incorrect = 0, missing = 0;
  const threshold = (guardState.config && typeof guardState.config.colorThreshold === 'number') ? guardState.config.colorThreshold : 10;
  const method = (guardState.config && guardState.config.colorComparisonMethod) || 'rgb';
  for (const [key, originalPixel] of guardState.originalPixels) {
    // Registrar píxeles originales para dar contexto al preview
    if (originalPixelsList.length < PREVIEW_LIMIT) {
      const [ox, oy] = key.split(',').map(Number);
      originalPixelsList.push({ x: ox, y: oy, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
    }
    const cur = currentPixels.get(key);
    if (!cur) {
      missing++;
      const [x,y]=key.split(',').map(Number);
      if (diffs.length < MAX_DIFFS) { diffs.push({ x,y,type:'missing', expectedColor: originalPixel.colorId }); }
      // Agregar a lista de faltantes para preview
      if (missingPixelsList.length < PREVIEW_LIMIT) {
        missingPixelsList.push({ x, y, r: originalPixel.r, g: originalPixel.g, b: originalPixel.b });
      }
      continue;
    }
    let isMatch;
    if (method === 'lab') {
      // Calcular LAB actual bajo demanda (no cacheado aún); se podría cachear también
      const curLab = rgbToLabArray(cur.r, cur.g, cur.b);
      const origLab = originalPixel.lab || rgbToLabArray(originalPixel.r, originalPixel.g, originalPixel.b);
      const dE = deltaE76(origLab, curLab);
      isMatch = dE <= threshold; // Reutiliza threshold para LAB (configurable a futuro separado)
    } else {
      const maxDiff = Math.max(Math.abs(originalPixel.r - cur.r), Math.abs(originalPixel.g - cur.g), Math.abs(originalPixel.b - cur.b));
      isMatch = maxDiff <= threshold;
    }
    const [x,y]=key.split(',').map(Number);
    if (isMatch) {
      correct++;
      // Agregar a lista de correctos para preview
      if (correctPixelsList.length < PREVIEW_LIMIT) {
        // Color actual (cur) o el original; usamos cur para reflejar pantalla actual
        correctPixelsList.push({ x, y, r: cur.r, g: cur.g, b: cur.b });
      }
    } else {
      incorrect++;
      if (diffs.length < MAX_DIFFS) { diffs.push({ x,y,type:'incorrect', expectedColor: originalPixel.colorId, currentColor: cur.colorId }); }
      // Agregar a lista de incorrectos para preview (con color actual y original)
      if (incorrectPixelsList.length < PREVIEW_LIMIT) {
        incorrectPixelsList.push({ x, y, r: cur.r, g: cur.g, b: cur.b, originalR: originalPixel.r, originalG: originalPixel.g, originalB: originalPixel.b });
      }
    }
  }
  const accuracy = total > 0 ? ((correct / total) * 100).toFixed(2) : '0.00';
  try { trackEvent('analysis_summary', { botVariant: 'slave-guard', metadata: { total, correct, incorrect, missing, accuracy, method, durationMs: Date.now()-start } }); } catch {}
  guardState.changes = new Set(diffs.filter(d=>d.type !== 'missing').map(d=>`${d.x},${d.y}`));
  guardState.lastCheck = Date.now();
  guardState.lastAnalysis = { summary: { total, correct, incorrect, missing, accuracy }, diffsSample: diffs, generatedAt: Date.now(), durationMs: (Date.now()-start).toString() };
  if (sendPreview) {
    // Marcar si truncamos alguna de las listas de preview (prácticamente nunca con el nuevo límite alto)
    const previewTruncated = originalPixelsList.length >= PREVIEW_LIMIT ||
                             correctPixelsList.length >= PREVIEW_LIMIT ||
                             incorrectPixelsList.length >= PREVIEW_LIMIT ||
                             missingPixelsList.length >= PREVIEW_LIMIT;
    sendPreview({
      protectedArea: guardState.protectionArea,
      analysis: { correctPixels: correct, incorrectPixels: incorrect, missingPixels: missing, accuracy: accuracy + '%', truncated: (diffs.length >= MAX_DIFFS) || previewTruncated, method },
      totalPixels: total,
      // Usamos la clave esperada por la UI: originalPixels. Enviamos también originalPixelsList por compatibilidad.
      originalPixels: originalPixelsList,
      originalPixelsList: originalPixelsList,
      correctPixelsList: correctPixelsList,
      incorrectPixelsList: incorrectPixelsList,
      missingPixelsList: missingPixelsList,
      changes: diffs,
      lastCheck: guardState.lastCheck,
      durationMs: guardState.lastAnalysis.durationMs,
      availableColors: Array.isArray(guardState.availableColors)
        ? guardState.availableColors.map(c => ({ id: c.id ?? c.colorId ?? 0, r: c.r, g: c.g, b: c.b }))
        : []
    });
  }
  log(`🧪 Análisis headless modular: total=${total} correct=${correct} incorrect=${incorrect} missing=${missing} diffsSent=${diffs.length}`);
}

// === Acciones manuales expuestas para guardControl ===
export async function manualCheck({ sendPreview, force } = {}) {
  log('🔍 manualCheck solicitado');
  await performGuardAnalysis({ sendPreview, force: force ?? true });
}

export async function manualRepair(params = {}, { sendPreview, force } = {}) {
  log('🛠️ manualRepair solicitado (simplificado headless)');
  // Realizar análisis para asegurar diffs actualizados
  await performGuardAnalysis({ sendPreview, force: force ?? true });
  guardRuntime.lastManualRepair = Date.now();
  if (typeof window === 'undefined' || !window.guardState) return { pixels: [] };
  const guardState = window.guardState;
  const last = guardState.lastAnalysis;
  if (!last || !last.diffsSample) return { pixels: [] };
  const limit = params.limit && params.limit > 0 ? params.limit : (guardState.pixelsPerBatch || guardState.config?.pixelsPerBatch || 10);
  let effectiveLimit = limit;
  if (guardState.spendAllPixelsOnStart && !guardState._spentAllOnce) {
    effectiveLimit = last.diffsSample.filter(d=>d.type==='incorrect'||d.type==='missing').length || limit;
    guardState._spentAllOnce = true;
  }
  // Construir estructura Map de cambios para aplicar patrones con color preference
  const changesMap = new Map();
  for (const d of last.diffsSample) {
    if (d.type === 'incorrect' || d.type === 'missing') {
      const key = `${d.x},${d.y}`;
      // Guardar info original mínima y current
      changesMap.set(key, { original: { colorId: d.expectedColor ?? d.colorId ?? 0 }, current: { colorId: d.currentColor ?? 0 }, type: d.type });
    }
  }
  const pattern = params.pattern || guardState.protectionPattern || 'random';
  const preferColor = guardState.preferColor;
  const preferredColorIds = guardState.preferredColorIds || [];
  const excludeColor = guardState.excludeColor;
  const excludedColorIds = guardState.excludedColorIds || [];
  const selectedKeys = getPixelsByPattern(pattern, changesMap, effectiveLimit, preferColor, null, preferredColorIds, excludeColor, excludedColorIds);
  const pixels = selectedKeys.map(k=>{ const [x,y]=k.split(',').map(Number); const meta=changesMap.get(k); return { x,y, expectedColor: meta.original.colorId, type: meta.type }; });
    try { trackEvent('repair_batch_suggested', { botVariant: 'slave-guard', metadata: { count: pixels.length, patternUsed: pattern, totalDiffs: last.diffsSample.length } }); } catch {}
  return { pixels, totalDiffs: last.diffsSample.length, patternUsed: pattern };
}

export async function toggleWatchMode() {
  if (typeof window === 'undefined' || !window.guardState) return null;
  window.guardState.watchMode = !window.guardState.watchMode;
  log(`👀 watchMode ahora: ${window.guardState.watchMode}`);
  return window.guardState.watchMode;
}

// ===== Utilidades de color (RGB -> LAB y DeltaE CIE76) =====
function rgbToXyzComponent(v) {
  v = v / 255; // normalizar
  return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

function rgbToLabArray(r, g, b) {
  // Convertir a espacio XYZ D65
  const R = rgbToXyzComponent(r);
  const G = rgbToXyzComponent(g);
  const B = rgbToXyzComponent(b);
  // Matriz de transformación sRGB D65
  const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const Y = (R * 0.2126 + G * 0.7152 + B * 0.0722) / 1.00000;
  const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;

  const fx = X > 0.008856 ? Math.cbrt(X) : (7.787 * X) + 16/116;
  const fy = Y > 0.008856 ? Math.cbrt(Y) : (7.787 * Y) + 16/116;
  const fz = Z > 0.008856 ? Math.cbrt(Z) : (7.787 * Z) + 16/116;

  const L = (116 * fy) - 16;
  const a = 500 * (fx - fy);
  const b2 = 200 * (fy - fz);
  return [L, a, b2];
}

function deltaE76(lab1, lab2) {
  const dL = lab1[0] - lab2[0];
  const da = lab1[1] - lab2[1];
  const db = lab1[2] - lab2[2];
  return Math.sqrt(dL*dL + da*da + db*db);
}
