/* global chrome */
// background.js to handle script execution
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'executeScript') {
        // Determine tabId: from sender (content script) or explicitly (popup)
        const tabId = request.tabId || sender.tab?.id;

        if (!tabId) {
            sendResponse({ success: false, error: 'Could not determine target tab' });
            return;
        }

        // Use IIFE (Immediately Invoked Function Expression) to handle async
        (async () => {
            try {
                await executeExternalScript(request.url, tabId);
                sendResponse({ success: true });
            } catch (error) {
                sendResponse({ success: false, error: error.message });
            }
        })();

        return true; // IMPORTANT: Indicates asynchronous response
    }
});

async function executeExternalScript(url, tabId) {
    try {
        console.log(`Downloading script from: ${url}`);

        // Download script with cache busting
        const response = await fetch(url, { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const scriptCode = await response.text();
        console.log(`Script downloaded: ${scriptCode.length} characters`);

        // Execute in MAIN page context (bypasses extension CSP)
        await chrome.scripting.executeScript({
            target: { tabId: tabId },
            world: "MAIN", // Key: executes in page context, not extension context
            func: (code) => {
                // Create script element to execute code
                const script = document.createElement('script');
                script.textContent = code;
                document.head.appendChild(script);
                script.remove(); // Clean up after execution
            },
            args: [scriptCode]
        });

        console.log('Script executed successfully in MAIN context');

    } catch (error) {
        console.error('Error executing external script:', error);
        throw error;
    }
}
