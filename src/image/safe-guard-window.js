import { log } from "../core/logger.js";
import { registerWindow, unregisterWindow } from '../core/window-manager.js';
import { t } from "../locales/index.js";

/**
 * Crea y gestiona el diálogo de confirmación para Auto-Guard
 */
export function createSafeGuardWindow() {
  
  /**
   * Muestra un diálogo de confirmación personalizable
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del diálogo
   * @param {Object} buttons - Configuración de botones
   * @returns {Promise<string>} - Resultado de la acción del usuario
   */
  function showConfirmDialog(message, title, buttons = {}) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0,0,0,0.7)';
      overlay.style.zIndex = '10001';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      
      const modal = document.createElement('div');
      modal.style.background = '#1a1a1a';
      modal.style.border = '2px solid #333';
      modal.style.borderRadius = '15px';
      modal.style.padding = '25px';
      modal.style.color = '#eee';
      modal.style.minWidth = '350px';
      modal.style.maxWidth = '400px';
      modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      modal.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
      
      modal.innerHTML = `
        <h3 style="margin: 0 0 15px 0; text-align: center; font-size: 18px;">${title}</h3>
        <p style="margin: 0 0 20px 0; text-align: center; line-height: 1.4; white-space: pre-line;">${message}</p>
        <div style="display: flex; gap: 10px; justify-content: center;">
          ${buttons.confirm ? `<button class="confirm-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${buttons.confirm}</button>` : ''}
          ${buttons.save ? `<button class="save-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #10b981; color: white;">${buttons.save}</button>` : ''}
          ${buttons.discard ? `<button class="discard-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #ef4444; color: white;">${buttons.discard}</button>` : ''}
          ${buttons.cancel ? `<button class="cancel-btn" style="padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; min-width: 100px; background: #2d3748; color: white;">${buttons.cancel}</button>` : ''}
        </div>
      `;
      
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      
      // Registrar modal en window manager
      registerWindow(overlay);
      
      // Event listeners
      const confirmBtn = modal.querySelector('.confirm-btn');
      const saveBtn = modal.querySelector('.save-btn');
      const discardBtn = modal.querySelector('.discard-btn');
      const cancelBtn = modal.querySelector('.cancel-btn');
      
      const cleanup = () => {
        // Desregistrar modal del window manager
        unregisterWindow(overlay);
        document.body.removeChild(overlay);
      };
      
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          cleanup();
          resolve('confirm');
        });
      }
      
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          cleanup();
          resolve('save');
        });
      }
      
      if (discardBtn) {
        discardBtn.addEventListener('click', () => {
          cleanup();
          resolve('discard');
        });
      }
      
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          cleanup();
          resolve('cancel');
        });
      }
      
      // Cerrar con overlay
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          cleanup();
          resolve('cancel');
        }
      });
      
      // Cerrar con ESC
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          cleanup();
          document.removeEventListener('keydown', handleKeyDown);
          resolve('cancel');
        }
      };
      document.addEventListener('keydown', handleKeyDown);
    });
  }

  /**
   * Muestra el diálogo específico para Auto-Guard
   * @param {Object} imageState - Estado de la imagen con datos necesarios
   * @param {Object} texts - Textos localizados
   * @returns {Promise<boolean>} - true si el usuario acepta, false si cancela
   */
  function showGuardDialog(imageState, texts = {}) {
    return new Promise((resolve) => {
      // Usar textos localizados con valores por defecto
      const localTexts = {
        guardDialogQuestion: texts.guardDialogQuestion || '¿Deseas generar un archivo JSON compatible con Auto-Guard.js?',
        guardDialogContent: texts.guardDialogContent || 'Este archivo contendrá',
        guardDialogArea: texts.guardDialogArea || 'Área de protección',
        guardDialogPixels: texts.guardDialogPixels || 'píxeles',
        guardDialogPosition: texts.guardDialogPosition || 'Posición',
        guardDialogPixelsToProtect: texts.guardDialogPixelsToProtect || 'píxeles para proteger',
        guardDialogSaveInfo: texts.guardDialogSaveInfo || 'El archivo se guardará automáticamente y podrás importarlo en Auto-Guard.js',
        guardDialogTitle: texts.guardDialogTitle || 'Generar JSON para Auto-Guard',
        guardDialogConfirm: texts.guardDialogConfirm || 'Sí, generar JSON',
        guardDialogCancel: texts.guardDialogCancel || 'No, continuar sin generar'
      };
      const remainingPixelsCount = imageState.remainingPixels ? imageState.remainingPixels.length : 0;
      const processor = imageState.imageData && imageState.imageData.processor ? imageState.imageData.processor : null;
      // Calcular total de píxeles si no hay remainingPixels
      let totalPixelsCount = remainingPixelsCount;
      try {
        if ((!totalPixelsCount || totalPixelsCount === 0) && processor && typeof processor.generatePixelQueue === 'function') {
          const all = processor.generatePixelQueue();
          if (Array.isArray(all)) totalPixelsCount = all.length;
        }
      } catch (e) {
        // sin bloqueo
      }
      // Dimensiones de la imagen
      let imageWidth = imageState.imageData ? imageState.imageData.width : 0;
      let imageHeight = imageState.imageData ? imageState.imageData.height : 0;
      if ((!imageWidth || !imageHeight) && processor && typeof processor.getDimensions === 'function') {
        try {
          const dims = processor.getDimensions();
          if (dims && dims.width && dims.height) {
            imageWidth = dims.width;
            imageHeight = dims.height;
          }
        } catch (e) {
          // ignore
        }
      }
      const tileX = typeof imageState.tileX === 'number' ? imageState.tileX : 0;
      const tileY = typeof imageState.tileY === 'number' ? imageState.tileY : 0;
      
      const message = `${localTexts.guardDialogQuestion}

${localTexts.guardDialogContent}:
• ${localTexts.guardDialogArea}: ${imageWidth}x${imageHeight} ${localTexts.guardDialogPixels}
• ${localTexts.guardDialogPosition}: Tile (${tileX}, ${tileY})
• ${totalPixelsCount || 0} ${localTexts.guardDialogPixelsToProtect}

${localTexts.guardDialogSaveInfo}.`;
        
        showConfirmDialog(
          message,
          `🛡️ ${localTexts.guardDialogTitle}`,
          {
            confirm: localTexts.guardDialogConfirm,
            cancel: localTexts.guardDialogCancel
          }
        ).then(result => {
        resolve(result === 'confirm');
      }).catch(() => {
        resolve(false);
      });
    });
  }

  /**
   * Genera y descarga el archivo JSON para Auto-Guard
   * @param {Object} guardData - Datos del guard generados
   * @returns {Promise<Object>} - Resultado de la operación
   */
  function saveGuardJSON(guardData) {
    return new Promise((resolve) => {
      try {
        // Validar estructura mínima requerida antes de guardar
        const hasProtection = guardData && guardData.protectionData && guardData.protectionData.area;
        const area = hasProtection ? guardData.protectionData.area : null;
        const hasAreaFields = area && ['x1','y1','x2','y2'].every(k => Number.isFinite(area[k]));
        const hasPixels = Array.isArray(guardData?.originalPixels);
        const hasColors = Array.isArray(guardData?.colors);
        if (!hasProtection || !hasAreaFields || !hasPixels || !hasColors) {
          log(t('image.guardJsonInvalidStructure'));
          try { showNotification(t('image.guardJsonInvalidMessage'), 'error'); } catch {}
          return resolve({ success: false, error: 'Invalid Guard JSON structure' });
        }
        
        // Crear nombre de archivo
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `wplace_GUARD_from_Image_${timestamp}.json`;
        
        // Crear y descargar archivo
        const dataStr = JSON.stringify(guardData, null, 2);
        const blob = new window.Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        log(t('image.guardJsonSaveSuccess', { filename }));
        resolve({ success: true, filename });
      } catch (error) {
        log(t('image.guardJsonSaveError', { error: error.message }));
        resolve({ success: false, error: error.message });
      }
    });
  }

  /**
   * Muestra un diálogo de notificación simple
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación ('success', 'error', 'info')
   */
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10002';
    notification.style.maxWidth = '300px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    notification.style.fontFamily = "'Segoe UI', Roboto, sans-serif";
    notification.style.fontSize = '14px';
    
    // Colores según el tipo
    switch (type) {
      case 'success':
        notification.style.background = '#10b981';
        break;
      case 'error':
        notification.style.background = '#ef4444';
        break;
      case 'warning':
        notification.style.background = '#f59e0b';
        break;
      default:
        notification.style.background = '#3b82f6';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Registrar notificación en window manager
    registerWindow(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      if (document.body.contains(notification)) {
        // Desregistrar notificación del window manager
        unregisterWindow(notification);
        document.body.removeChild(notification);
      }
    }, 3000);
  }

  return {
    showConfirmDialog,
    showGuardDialog,
    saveGuardJSON,
    showNotification
  };
}

// Exportar también las funciones individuales para compatibilidad
export function showConfirmDialog(message, title, buttons = {}) {
  const safeGuardWindow = createSafeGuardWindow();
  return safeGuardWindow.showConfirmDialog(message, title, buttons);
}

export function showGuardDialog(imageState, texts = {}) {
  const safeGuardWindow = createSafeGuardWindow();
  return safeGuardWindow.showGuardDialog(imageState, texts);
}

export function saveGuardJSON(guardData) {
  const safeGuardWindow = createSafeGuardWindow();
  return safeGuardWindow.saveGuardJSON(guardData);
}

export function showNotification(message, type = 'info') {
  const safeGuardWindow = createSafeGuardWindow();
  return safeGuardWindow.showNotification(message, type);
}