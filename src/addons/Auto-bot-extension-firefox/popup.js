/* global browser, chrome */
// popup.js para Firefox - adaptado desde Chrome
// Firefox usa browser.* APIs en lugar de chrome.*

// Polyfill para compatibilidad con chrome.*
if (typeof browser !== "undefined" && !window.chrome) {
    window.chrome = browser;
}

// Usar la API apropiada según el navegador
const runtime = typeof browser !== "undefined" ? browser.runtime : chrome.runtime;
const tabs = typeof browser !== "undefined" ? browser.tabs : chrome.tabs;

document.addEventListener('DOMContentLoaded', function() {
    const executeBtn = document.getElementById('executeBtn');
    const status = document.getElementById('status');

    // Verificar que los elementos existen
    if (!executeBtn || !status) {
        console.error('Required elements not found in popup');
        return;
    }

    executeBtn.addEventListener('click', async function() {
        console.log('Execute button clicked');

        try {
            // Cambiar estado del botón
            executeBtn.disabled = true;
            executeBtn.textContent = '⏳ Executing...';
            status.textContent = 'Getting active tab...';

            // Obtener la pestaña activa - Firefox usa una sintaxis ligeramente diferente
            const tabs_result = await tabs.query({ active: true, currentWindow: true });
            const tab = tabs_result[0];
            console.log('Tab obtained:', tab);

            // Verificar si estamos en wplace.live
            if (!tab.url.includes('wplace.live')) {
                throw new Error('You must be on wplace.live to use this extension');
            }

            status.textContent = 'Sending message to background...';
            console.log('Sending message to background script');

            // Usar timeout para evitar que se quede colgado
            const messagePromise = runtime.sendMessage({
                action: 'executeScript',
                url: 'https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js',
                tabId: tab.id
            });

            // Añadir timeout de 10 segundos
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout: Message took more than 10 seconds')), 10000);
            });

            status.textContent = 'Waiting for response...';
            const response = await Promise.race([messagePromise, timeoutPromise]);

            console.log('Response received:', response);

            if (response && response.success) {
                status.textContent = '✅ AutoBot executed successfully';
                executeBtn.textContent = '✅ Executed';

                // Cerrar popup después de 2 segundos
                setTimeout(() => {
                    window.close();
                }, 2000);
            } else {
                throw new Error(response?.error || 'Unknown error in response');
            }

        } catch (error) {
            console.error('Complete error:', error);

            // Firefox maneja los errores de runtime de manera diferente
            if (runtime.lastError) {
                console.error('Runtime error:', runtime.lastError);
                status.textContent = '❌ Error: Extension context invalidated';
            } else if (error.message.includes('Timeout')) {
                status.textContent = '❌ Timeout: Response took too long';
            } else {
                status.textContent = `❌ Error: ${error.message}`;
            }

            executeBtn.textContent = '🚀 Retry';
            executeBtn.disabled = false;
        }
    });

    // Verificar si estamos en la página correcta al cargar
    tabs.query({ active: true, currentWindow: true }).then(function(tabs_result) {
        if (runtime.lastError) {
            console.error('Error getting tab:', runtime.lastError);
            status.textContent = '❌ Error getting active tab';
            return;
        }

        if (tabs_result[0] && !tabs_result[0].url.includes('wplace.live')) {
            status.textContent = '⚠️ Go to wplace.live to use the extension';
            executeBtn.disabled = true;
        }
    }).catch(function(error) {
        console.error('Error in tabs.query:', error);
        status.textContent = '❌ Error getting active tab';
    });
});