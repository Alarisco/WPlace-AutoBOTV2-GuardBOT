import { mountFarmUI } from "./ui.js";
import { loop } from "./loop.js";

export async function runFarm() {
  const ui = mountFarmUI();
  const config = {
    running: true,
    tileX: 0, tileY: 0,
    palette: ["#000000", "#ffffff"],  // reemplaza por tu paleta real
    siteKey: "TU_TURNSTILE_SITEKEY",
    cooldownMs: 30000
  };
  
  window.__wplaceBot.stop = () => (config.running = false, ui.setStatus("Detenido"));
  await loop(config, (s) => ui.setStatus(s));
}
