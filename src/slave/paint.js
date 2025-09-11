// Painting helpers for Slave: modularized from index.js to keep logic reusable and testable
import { postPixelBatchImage } from "../core/wplace-api.js";
import { ensureToken } from "../core/turnstile.js";

// Paint a single tile batch; coords are local flat [x,y,...] within the tile
export async function paintBatch({ tileX, tileY, coordsFlat, colors, sendToMaster, shouldAbort }) {
  const BATCH = 200;
  let totalPainted = 0;
  let lastStatus = 0;
  let lastSuccess = false;

  for (let i = 0; i < colors.length; i += BATCH) {
    if (shouldAbort && shouldAbort()) {
      sendSafe(sendToMaster, { type: 'paint_result', ok: false, aborted: true, tileX, tileY, painted: totalPainted });
      return { success: false, status: lastStatus, painted: totalPainted, aborted: true };
    }

    const subColors = colors.slice(i, i + BATCH);
    // Slice corresponding coordsFlat: 2 entries per color
    const start = i * 2;
    const end = Math.min(colors.length, i + BATCH) * 2;
    const subCoordsFlat = coordsFlat.slice(start, end);

    let t = null;
    try { t = await ensureToken(); } catch {}

    const result = await postPixelBatchImage(tileX, tileY, subCoordsFlat, subColors, t);
    lastStatus = result?.status || 0;
    lastSuccess = !!result?.success;
    const painted = Math.trunc(result?.painted || 0);
    totalPainted += painted;

    sendSafe(sendToMaster, { type: 'paint_progress', tileX, tileY, painted, batchIndex: Math.floor(i / BATCH), totalBatches: Math.ceil(colors.length / BATCH) });
    await sleepBrief(100);
  }

  sendSafe(sendToMaster, { type: 'paint_result', ok: lastSuccess, status: lastStatus, tileX, tileY, painted: totalPainted });
  return { success: lastSuccess, status: lastStatus, painted: totalPainted };
}

// Repair arbitrary pixels in global coordinates: groups by tile, converts to local coords, paints
export async function repairPixels({ pixels, tileSize = 1000, sendToMaster, shouldAbort }) {
  if (!Array.isArray(pixels) || pixels.length === 0) return { painted: 0 };

  // Group by tile
  const byTile = new Map(); // key -> { tileX, tileY, localsFlat: number[], colors: number[] }
  for (const p of pixels) {
    const gx = Math.trunc(p.x);
    const gy = Math.trunc(p.y);
    const color = Math.trunc(p.expectedColor ?? p.color ?? 0);
    const tileX = Math.floor(gx / tileSize);
    const tileY = Math.floor(gy / tileSize);
    const lx = gx - tileX * tileSize;
    const ly = gy - tileY * tileSize;
    const key = `${tileX},${tileY}`;
    if (!byTile.has(key)) byTile.set(key, { tileX, tileY, localsFlat: [], colors: [] });
    const bucket = byTile.get(key);
    bucket.localsFlat.push(lx, ly);
    bucket.colors.push(color);
  }

  let totalPainted = 0;
  for (const [, group] of byTile) {
    if (shouldAbort && shouldAbort()) {
      sendSafe(sendToMaster, { type: 'paint_result', ok: false, aborted: true, painted: totalPainted });
      return { painted: totalPainted, aborted: true };
    }
    const { tileX, tileY, localsFlat, colors } = group;
    const res = await paintBatch({ tileX, tileY, coordsFlat: localsFlat, colors, sendToMaster, shouldAbort });
    totalPainted += Math.trunc(res?.painted || 0);
    await sleepBrief(150);
  }

  sendSafe(sendToMaster, { type: 'repair_complete', completed: totalPainted, source: 'guard_one_batch' });
  return { painted: totalPainted };
}

function sendSafe(sendToMaster, msg) {
  try { if (typeof sendToMaster === 'function') sendToMaster(msg); } catch {}
}

function sleepBrief(ms) { return new Promise(r => setTimeout(r, ms)); }
