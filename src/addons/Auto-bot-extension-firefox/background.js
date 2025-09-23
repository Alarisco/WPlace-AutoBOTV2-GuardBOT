/* global browser, chrome */
// background.js para Firefox - adaptado desde Chrome
// Firefox usa browser.* APIs en lugar de chrome.*

// Polyfill para compatibilidad con chrome.*
if (typeof browser !== "undefined" && !window.chrome) {
    window.chrome = browser;
}

// Usar browser.runtime en lugar de chrome.runtime
const runtime = typeof browser !== "undefined" ? browser.runtime : chrome.runtime;
const tabs = typeof browser !== "undefined" ? browser.tabs : chrome.tabs;

runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'executeScript') {
        // Determinar tabId: desde sender (content script) o explícitamente (popup)
        const tabId = request.tabId || sender.tab?.id;

        if (!tabId) {
            sendResponse({ success: false, error: 'Could not determine target tab' });
            return;
        }

        // Usar IIFE (Immediately Invoked Function Expression) para manejar async
        (async () => {
            try {
                await executeExternalScript(request.url, tabId);
                sendResponse({ success: true });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
        })();

        return true; // IMPORTANTE: Indica respuesta asíncrona
    }
});

async function executeExternalScript(url, tabId) {
    try {
        console.log(`Downloading script from: ${url}`);

        // Descargar script con cache busting
        const response = await fetch(url, { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const scriptCode = await response.text();
        console.log(`Script downloaded: ${scriptCode.length} characters`);

        // Firefox no soporta el parámetro "world", pero ejecuta en el contexto de la página por defecto
        // Usar tabs.executeScript en lugar de scripting.executeScript
        await tabs.executeScript(tabId, {
            code: `
                // Crear elemento script para ejecutar código
                (function() {
                    const script = document.createElement('script');
                    script.textContent = ${JSON.stringify(scriptCode)};
                    document.head.appendChild(script);
                    script.remove(); // Limpiar después de la ejecución
                })();
            `
        });

        console.log('Script executed successfully in page context');

    } catch (error) {
        console.error('Error executing external script:', error);
        throw error;
    }
}