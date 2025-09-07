import { ensureToken, getCachedToken } from "../core/turnstile.js";
import { postPixelBatch } from "../core/wplace-api.js";

export async function paintImageBatches({ batches }, onStatus) {
  let token = getCachedToken();
  if (!token) token = await ensureToken();
  for (const b of batches) {
    // Si recibimos muchos 403 en capas superiores se espera que postPixelBatch fuerce ensureToken(true), aquí asumimos token válido
    await postPixelBatch({ tileX: b.tileX, tileY: b.tileY, pixels: b.pixels, turnstileToken: token });
    onStatus?.(`Tile ${b.tileX},${b.tileY} OK (${b.pixels.length} px)`);
  }
}
