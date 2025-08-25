// Overlay del área de protección para Auto-Guard.js
// Sistema de visualización basado en intercepción de tiles

import { log } from '../core/logger.js';
import { guardState } from './config.js';

// Globals del navegador
const { setTimeout, Request, Response, createImageBitmap, OffscreenCanvas } = window;

class GuardOverlay {
  constructor() {
    this.isEnabled = false;
    this.displayEnabled = false; // Modo Display (negativo + diferencias)
    this.protectionArea = null;
    this.originalFetch = null;
    this.isIntercepting = false;
    this.TILE_SIZE = 1000; // Tamaño de tile en WPlace
  }

  initialize() {
    try {
      log('✅ Overlay de protección inicializado');
      return true;
    } catch (error) {
      log('❌ Error inicializando overlay:', error);
      return false;
    }
  }

  showProtectionArea(area) {
    this.protectionArea = area;
    this.isEnabled = true;
    this.startFetchInterception();
    
    log(`🛡️ Mostrando área de protección: (${area.x1},${area.y1}) a (${area.x2},${area.y2})`);
  }

  hideProtectionArea() {
    this.isEnabled = false;
    this.stopFetchInterception();
    log('🔍 Ocultando área de protección');
  }

  // Nuevo: mostrar/ocultar modo Display
  showDisplay(area) {
    this.displayEnabled = true;
    this.showProtectionArea(area);
    log('🖼️ Display activado');
  }

  hideDisplay() {
    this.displayEnabled = false;
    this.hideProtectionArea();
    log('🖼️ Display desactivado');
  }

  // === SISTEMA DE INTERCEPCIÓN DE FETCH ===
  startFetchInterception() {
    if (this.isIntercepting) return;

    this.originalFetch = window.fetch;
    this.isIntercepting = true;

    window.fetch = async (...args) => {
      const response = await this.originalFetch.apply(window, args);
      const cloned = response.clone();

      const endpointName = ((args[0] instanceof Request) ? args[0]?.url : args[0]) || 'ignore';
      const contentType = cloned.headers.get('content-type') || '';

      // Log todas las requests para depurar
      if (endpointName.includes('tiles') || endpointName.includes('tile')) {
        log(`🔍 TILE REQUEST: ${endpointName} | ContentType: ${contentType}`);
      }

      // Interceptar solo tiles de imagen - patrón más amplio
      if (contentType.includes('image/') && 
          (endpointName.includes('/tiles/') || endpointName.includes('/tile/')) && 
          !endpointName.includes('openfreemap') && 
          !endpointName.includes('maps')) {

        log(`📡 Interceptando tile: ${endpointName}`);

        try {
          const blob = await cloned.blob();
          const processedBlob = await this.drawProtectionOnTile(blob, endpointName);
          
          return new Response(processedBlob, {
            headers: cloned.headers,
            status: cloned.status,
            statusText: cloned.statusText
          });
        } catch (error) {
          log('❌ Error procesando tile:', error);
          return response;
        }
      }

      return response;
    };

    log('🔍 Intercepción de tiles iniciada para overlay de protección');
  }

  stopFetchInterception() {
    if (!this.isIntercepting || !this.originalFetch) return;

    window.fetch = this.originalFetch;
    this.isIntercepting = false;

    log('⏹️ Intercepción de tiles detenida');
  }

  // === PROCESAMIENTO DE TILES ===
  async drawProtectionOnTile(tileBlob, endpointUrl) {
    if (!this.isEnabled || !this.protectionArea) {
      return tileBlob;
    }

    log(`🔧 Procesando tile: ${endpointUrl}`);

    // Extraer coordenadas del tile desde la URL - patrón más flexible
    // Posibles formatos: 
    // - ".../tiles/tileX/tileY/zoom.png"
    // - ".../tile/tileX/tileY.png"
    // - ".../tileX/tileY.png"
    
    let tileX, tileY;
    
    // Método 1: Extraer números del final de la URL
    const urlParts = endpointUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1].replace(/\.(png|jpg|jpeg|webp).*$/i, '');
    const secondLastPart = urlParts[urlParts.length - 2];
    
    // Intentar parsear como números
    tileY = parseInt(lastPart);
    tileX = parseInt(secondLastPart);
    
    // Método 2: Si no funciona, buscar patrones en toda la URL
    if (isNaN(tileX) || isNaN(tileY)) {
      const numberMatches = endpointUrl.match(/\/(\d+)\/(\d+)(?:\/\d+)?\.(?:png|jpg|jpeg|webp)/i);
      if (numberMatches) {
        tileX = parseInt(numberMatches[1]);
        tileY = parseInt(numberMatches[2]);
      }
    }

    if (isNaN(tileX) || isNaN(tileY)) {
      log(`❌ No se pudieron extraer coordenadas de: ${endpointUrl}`);
      return tileBlob;
    }

    log(`📍 Coordenadas extraídas: tile(${tileX}, ${tileY})`);

    // Verificar si este tile intersecta con el área de protección
    if (!this.tileIntersectsProtectionArea(tileX, tileY)) {
      log(`➡️ Tile ${tileX},${tileY} no intersecta con área de protección`);
      return tileBlob; // No hay intersección
    }

    log(`🎯 Tile ${tileX},${tileY} INTERSECTA con área de protección - aplicando overlay`);

    // Procesar el tile
    const tileBitmap = await createImageBitmap(tileBlob);
    const canvas = new OffscreenCanvas(tileBitmap.width, tileBitmap.height);
    const context = canvas.getContext('2d');
    
    context.imageSmoothingEnabled = false;
    context.drawImage(tileBitmap, 0, 0);

    // Dibujar overlay del área de protección
    this.drawProtectionOverlay(context, tileX, tileY, tileBitmap.width, tileBitmap.height);

    const result = await canvas.convertToBlob({ type: 'image/png' });
    log(`✅ Tile ${tileX},${tileY} procesado con overlay`);
    
    return result;
  }

  tileIntersectsProtectionArea(tileX, tileY) {
    if (!this.protectionArea) return false;

    const { x1, y1, x2, y2 } = this.protectionArea;
    
    // Calcular límites del tile
    const tileStartX = tileX * this.TILE_SIZE;
    const tileEndX = tileStartX + this.TILE_SIZE;
    const tileStartY = tileY * this.TILE_SIZE;
    const tileEndY = tileStartY + this.TILE_SIZE;

    // Log para depurar
    log(`🔍 Verificando intersección:`);
    log(`   Tile ${tileX},${tileY}: (${tileStartX}-${tileEndX}, ${tileStartY}-${tileEndY})`);
    log(`   Área protección: (${x1}-${x2}, ${y1}-${y2})`);

    // Verificar intersección
    const intersects = !(x2 < tileStartX || x1 > tileEndX || y2 < tileStartY || y1 > tileEndY);
    
    log(`   🎯 Intersecta: ${intersects}`);
    
    return intersects;
  }

  drawProtectionOverlay(context, tileX, tileY, tileWidth, tileHeight) {
    if (!this.protectionArea) return;

    const { x1, y1, x2, y2 } = this.protectionArea;
    
    // Calcular límites del tile
    const tileStartX = tileX * this.TILE_SIZE;
    const tileStartY = tileY * this.TILE_SIZE;
    
    // Calcular la parte del área de protección que cae en este tile
    const localX1 = Math.max(0, x1 - tileStartX);
    const localY1 = Math.max(0, y1 - tileStartY);
    const localX2 = Math.min(this.TILE_SIZE, x2 - tileStartX);
    const localY2 = Math.min(this.TILE_SIZE, y2 - tileStartY);

    // Si no hay área visible en este tile, salir
    if (localX1 >= localX2 || localY1 >= localY2) return;

    // Escalar a las dimensiones del tile renderizado
    const scaleX = tileWidth / this.TILE_SIZE;
    const scaleY = tileHeight / this.TILE_SIZE;

    const renderX1 = localX1 * scaleX;
    const renderY1 = localY1 * scaleY;
    const renderWidth = (localX2 - localX1) * scaleX;
    const renderHeight = (localY2 - localY1) * scaleY;

    log(`🎨 Dibujando overlay en tile ${tileX},${tileY}:`);
    log(`   Local: (${localX1},${localY1}) a (${localX2},${localY2})`);
    log(`   Render: (${renderX1},${renderY1}) tamaño: ${renderWidth}x${renderHeight}`);
    log(`   Scale: ${scaleX} x ${scaleY}, TileSize: ${tileWidth}x${tileHeight}`);

    // Guardar estado del contexto
    context.save();

    if (this.displayEnabled) {
      // 1) Modo Display: aplicar negativo (invertir colores) SOLO dentro del área
      context.globalCompositeOperation = 'difference';
      context.fillStyle = 'white'; // difference con blanco = invertido
      context.fillRect(renderX1, renderY1, renderWidth, renderHeight);
      context.globalCompositeOperation = 'source-over';

      // 2) Resaltar píxeles que no coinciden en ROJO sólido usando guardState.changes
      if (guardState?.changes && guardState.changes.size > 0) {
        context.fillStyle = 'rgba(255, 0, 0, 0.9)';
        for (const [_key, change] of guardState.changes) {
          const orig = change.original;
          if (!orig) continue;
          if (orig.tileX !== tileX || orig.tileY !== tileY) continue; // Solo este tile
          // Asegurar que cae en el recorte local
          if (orig.localX < localX1 || orig.localX >= localX2 || orig.localY < localY1 || orig.localY >= localY2) continue;

          const px = orig.localX * scaleX;
          const py = orig.localY * scaleY;
          // Pintar el rectángulo del píxel
          context.fillRect(px, py, Math.max(1, scaleX), Math.max(1, scaleY));
        }
      }

      // Borde sutil para delimitar área en modo Display
      context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      context.lineWidth = Math.max(1, 1.5 * Math.max(scaleX, scaleY));
      context.strokeRect(renderX1, renderY1, renderWidth, renderHeight);

      // Etiqueta removida
    } else {
      // Modo Overlay clásico (área roja con cuadrícula)
      context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // 50% opacidad
      context.fillRect(renderX1, renderY1, renderWidth, renderHeight);

      context.strokeStyle = 'rgba(255, 0, 0, 1.0)'; // Totalmente opaco
      context.lineWidth = Math.max(1, 1.5 * Math.max(scaleX, scaleY));
      context.strokeRect(renderX1, renderY1, renderWidth, renderHeight);

      context.strokeStyle = 'rgba(255, 255, 0, 0.8)'; // Líneas amarillas
      context.lineWidth = Math.max(0.5, 1 * Math.max(scaleX, scaleY));
      
      // Líneas verticales cada 10 píxeles
      for (let i = 0; i <= renderWidth; i += 10 * scaleX) {
        context.beginPath();
        context.moveTo(renderX1 + i, renderY1);
        context.lineTo(renderX1 + i, renderY1 + renderHeight);
        context.stroke();
      }
      
      // Líneas horizontales cada 10 píxeles
      for (let i = 0; i <= renderHeight; i += 10 * scaleY) {
        context.beginPath();
        context.moveTo(renderX1, renderY1 + i);
        context.lineTo(renderX1 + renderWidth, renderY1 + i);
        context.stroke();
      }

      // Etiqueta removida
    }

    // Restaurar estado del contexto
    context.restore();

    log(`✅ Overlay dibujado en tile ${tileX},${tileY}`);
  }

  updateArea(newArea) {
    this.protectionArea = newArea;
    // El overlay se actualizará automáticamente cuando se recargren los tiles
  }

  toggle() {
    if (this.isEnabled) {
      this.hideProtectionArea();
    } else if (this.protectionArea) {
      this.showProtectionArea(this.protectionArea);
    }
  }

  destroy() {
    this.stopFetchInterception();
    this.protectionArea = null;
    this.isEnabled = false;
    this.displayEnabled = false;
    log('🗑️ Overlay destruido');
  }

  // Métodos compatibles con el sistema anterior
  handleViewportChange() {
    // El sistema de intercepción de tiles no necesita manejar viewport manualmente
  }
}

// Instancia global del overlay
export const guardOverlay = new GuardOverlay();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => guardOverlay.initialize(), 1000);
  });
} else {
  setTimeout(() => guardOverlay.initialize(), 1000);
}

export default guardOverlay;
