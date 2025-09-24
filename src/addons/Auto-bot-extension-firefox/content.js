/* global browser, chrome */
// content.js para Firefox - adaptado desde Chrome
// Firefox usa browser.* APIs en lugar de chrome.*

// Polyfill para compatibilidad con chrome.*
if (typeof browser !== "undefined" && !window.chrome) {
    window.chrome = browser;
}

// Usar la API apropiada según el navegador
const runtime = typeof browser !== "undefined" ? browser.runtime : chrome.runtime;

// Verificar si estamos en wplace.live
if (window.location.hostname === 'wplace.live') {

    // Variables de control del injector
    let _injectorReady = false;
    let _pendingExecution = null;
    let autoBotButton = null;
    let buttonRemoved = false;
    let buttonHiddenByModal = false;

    // Función para verificar si hay algún modal abierto
    function isAnyModalOpen() {
        const modals = document.querySelectorAll('dialog.modal[open], dialog[open]');
        return modals.length > 0;
    }

    // Función para manejar la visibilidad del botón AutoBot según modales
    function handleAutoBotVisibility() {
        if (!autoBotButton || buttonRemoved) return;

        if (isAnyModalOpen()) {
            if (!buttonHiddenByModal) {
                buttonHiddenByModal = true;
                autoBotButton.style.transition = 'all 0.3s ease-out';
                autoBotButton.style.opacity = '0';
                autoBotButton.style.transform = 'scale(0.8)';
                autoBotButton.style.pointerEvents = 'none';
            }
        } else {
            if (buttonHiddenByModal) {
                buttonHiddenByModal = false;
                autoBotButton.style.transition = 'all 0.3s ease-in';
                autoBotButton.style.opacity = '1';
                autoBotButton.style.transform = 'scale(1)';
                autoBotButton.style.pointerEvents = 'auto';
            }
        }
    }

    // Función para remover botón permanentemente con animación
    function removeButtonWithAnimation() {
        buttonRemoved = true;

        if (autoBotButton && autoBotButton.parentNode) {
            autoBotButton.style.transition = 'all 0.5s ease-out';
            autoBotButton.style.opacity = '0';
            autoBotButton.style.transform = 'scale(0.5) translateY(-10px)';

            setTimeout(() => {
                if (autoBotButton && autoBotButton.parentNode) {
                    autoBotButton.parentNode.removeChild(autoBotButton);
                    autoBotButton = null;
                }
            }, 500);
        }
    }

    // Función para ejecutar el launcher usando browser/chrome APIs
    async function executeLauncher() {
        if (!autoBotButton) return;

        try {
            // Cambiar apariencia del botón
            autoBotButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 animate-spin">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
            `;
            autoBotButton.style.opacity = '0.7';
            autoBotButton.disabled = true;

            // Enviar mensaje al background script para ejecutar el script
            const response = await runtime.sendMessage({
                action: 'executeScript',
                url: 'https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js'
            });

            if (response && response.success) {
                // Mostrar éxito
                autoBotButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                `;
                autoBotButton.style.background = '#4CAF50';
                autoBotButton.disabled = false;

                // Desaparecer después de 1.5 segundos
                setTimeout(() => {
                    removeButtonWithAnimation();
                }, 1500);
            } else {
                throw new Error(response?.error || 'Failed to execute script');
            }

        } catch (error) {
            console.error('Error executing launcher:', error);

            // Feedback visual de error
            if (autoBotButton) {
                autoBotButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
                    </svg>
                `;
                autoBotButton.style.opacity = '1';
                autoBotButton.style.background = '#f44336';
                autoBotButton.title = 'Error - Click to retry';

                setTimeout(() => {
                    autoBotButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12A2,2 0 0,1 6,10M18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12A2,2 0 0,1 18,10M8,17.5H16V16H8V17.5Z"/>
                        </svg>
                    `;
                    autoBotButton.style.background = '';
                    autoBotButton.title = 'AutoBot';
                    autoBotButton.disabled = false;
                }, 3000);
            }
        }
    }

    // Función para crear el botón AutoBot
    function createAutoButton() {
        if (buttonRemoved) return;

        const menuContainer = document.querySelector('.absolute.right-2.top-2.z-30 .flex.flex-col.gap-3.items-center');

        if (!menuContainer) {
            setTimeout(createAutoButton, 1000);
            return;
        }

        if (document.getElementById('wplace-autobot-btn')) {
            return;
        }

        autoBotButton = document.createElement('button');
        autoBotButton.id = 'wplace-autobot-btn';
        autoBotButton.className = 'btn btn-square shadow-md';
        autoBotButton.title = 'AutoBot';
        autoBotButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12A2,2 0 0,1 6,10M18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12A2,2 0 0,1 18,10M8,17.5H16V16H8V17.5Z"/>
            </svg>
        `;

        autoBotButton.style.cssText = `
            transition: all 0.2s ease;
        `;

        autoBotButton.addEventListener('click', executeLauncher);

        // Insertar el botón AL FINAL del contenedor
        menuContainer.appendChild(autoBotButton);

        setTimeout(() => handleAutoBotVisibility(), 100);

        console.log('AutoBot button added to menu');
    }

    // Configurar observadores para detectar cambios en modales
    function setupModalObservers() {
        const modalAttributeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
                    handleAutoBotVisibility();
                }
            });
        });

        const domObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.matches && node.matches('dialog.modal, dialog')) {
                                modalAttributeObserver.observe(node, {
                                    attributes: true,
                                    attributeFilter: ['open']
                                });
                                handleAutoBotVisibility();
                            }

                            const nestedModals = node.querySelectorAll ?
                                node.querySelectorAll('dialog.modal, dialog') : [];
                            nestedModals.forEach((modal) => {
                                modalAttributeObserver.observe(modal, {
                                    attributes: true,
                                    attributeFilter: ['open']
                                });
                            });

                            if (nestedModals.length > 0) {
                                handleAutoBotVisibility();
                            }
                        }
                    });

                    if (mutation.removedNodes.length > 0) {
                        handleAutoBotVisibility();
                    }
                }
            });
        });

        const existingModals = document.querySelectorAll('dialog.modal, dialog');
        existingModals.forEach((modal) => {
            modalAttributeObserver.observe(modal, {
                attributes: true,
                attributeFilter: ['open']
            });
        });

        domObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Observer principal para recrear botón
    const buttonObserver = new MutationObserver((mutations) => {
        if (!buttonRemoved) {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    if (!document.getElementById('wplace-autobot-btn')) {
                        setTimeout(createAutoButton, 500);
                    }
                }
            });
        }
    });

    // Inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createAutoButton();
            setupModalObservers();
        });
    } else {
        createAutoButton();
        setupModalObservers();
    }

    setTimeout(() => {
        createAutoButton();
        setupModalObservers();
    }, 2000);

    buttonObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}