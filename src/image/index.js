import { mountImageUI } from "./ui.js";
import { paintImageBatches } from "./loop.js";
import { groupByTile } from "./batcher.js";

export async function runImage() {
  const ui = mountImageUI();
  // Sustituye por tu pipeline real de rasterizado -> pixels absolutos
  const examplePixels = [{ absX: 100, absY: 200, color: "#000" }];
  const batches = groupByTile(examplePixels);
  
  window.__wplaceBot.stop = () => ui.setStatus("Detenido");
  await paintImageBatches({ batches, siteKey: "TU_TURNSTILE_SITEKEY" }, (s)=>ui.setStatus(s));
}
