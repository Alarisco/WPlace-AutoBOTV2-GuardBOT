import { executeTurnstile, loadTurnstile } from "../core/turnstile.js";
import { postPixelBatch } from "../core/wplace-api.js";
import { randomCoordInTile, nextColor } from "./coords.js";

export async function paintOnce({ tileX, tileY, palette, siteKey }) {
  await loadTurnstile(siteKey);
  const token = await executeTurnstile(siteKey, "paint");
  const coord = randomCoordInTile(tileX, tileY);
  const px = [{ x: coord.x, y: coord.y, color: nextColor(palette) }];
  return postPixelBatch({ tileX, tileY, pixels: px, turnstileToken: token });
}

export async function loop(config, onStatus) {
  // Sustituye este esquema por tu lógica actual de cooldown/retry/counter.
  while (config.running) {
    try {
      await paintOnce(config);
      onStatus?.("Pintado OK; aplicando cooldown…");
      await new Promise(r => setTimeout(r, config.cooldownMs || 30000));
    } catch (e) {
      onStatus?.("Error: " + e.message + " (reintentando)");
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}
