import { ensureToken } from "../core/turnstile.js";
import { postPixelBatch } from "../core/wplace-api.js";

export async function paintImageBatches({ batches }, onStatus) {
  for (const b of batches) {
    const token = await ensureToken();
    await postPixelBatch({ tileX: b.tileX, tileY: b.tileY, pixels: b.pixels, turnstileToken: token });
    onStatus?.(`Tile ${b.tileX},${b.tileY} OK (${b.pixels.length} px)`);
  }
}
