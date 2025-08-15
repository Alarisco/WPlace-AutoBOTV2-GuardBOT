import { mountFarmUI } from "./ui.js";
import { loop } from "./loop.js";
import { initializeLanguage, t } from "../locales/index.js";

export async function runFarm() {
  // Initialize internationalization
  await initializeLanguage();
  
  // Listen for language changes
  window.addEventListener('languageChanged', updateTexts);
  
  const ui = mountFarmUI();
  
  // Store UI reference globally for language updates
  if (!window.__wplaceBot) {
    window.__wplaceBot = {};
  }
  window.__wplaceBot.ui = ui;
  
  const config = {
    running: true,
    tileX: 0, tileY: 0,
    palette: ["#000000", "#ffffff"],  // reemplaza por tu paleta real
    siteKey: "TU_TURNSTILE_SITEKEY",
    cooldownMs: 30000
  };
  
  window.__wplaceBot.stop = () => (config.running = false, ui.setStatus(t('farm.stopped')));
  await loop(config, (s) => ui.setStatus(s));
}

function updateTexts() {
  // Update any dynamic text that might be visible
  // Since the farm UI creates its own elements, we'll need to update them through the UI instance
  if (window.__wplaceBot && window.__wplaceBot.ui) {
    window.__wplaceBot.ui.updateTexts();
  }
}
