import { log } from "./logger.js";

// Sistema de captura para coordenadas del tile
export class CoordinateCapture {
  constructor() {
    this.active = false;
    this.originalFetch = window.fetch;
    this.callback = null;
  }

  // Habilitar captura de coordenadas por una vez
  enable(callback) {
    if (this.active) {
      log('⚠️ Captura ya está activa');
      return;
    }

    this.active = true;
    this.callback = callback;
    
    log('🕵️ Captura de coordenadas activada. Pinta un píxel manualmente...');
    
    // Interceptar fetch
    window.fetch = async (...args) => {
      const result = await this.originalFetch.apply(window, args);
      
      if (this.active && this.shouldCapture(args[0], args[1])) {
        await this.handleCapture(args[0], args[1], result.clone());
      }
      
      return result;
    };

    // Auto-desactivar después de 30 segundos
    setTimeout(() => {
      if (this.active) {
        this.disable();
        log('⏰ Captura de coordenadas expirada');
      }
    }, 30000);
  }

  // Verificar si debemos capturar esta petición
  shouldCapture(url, options) {
    if (!url || !options) return false;
    
    // Buscar patrones de URL relacionados con pintar
    const urlStr = url.toString();
    if (!urlStr.includes('paint') && !urlStr.includes('pixel') && !urlStr.includes('place')) {
      return false;
    }

    // Verificar que sea un POST con datos
    if (!options.method || options.method.toUpperCase() !== 'POST') {
      return false;
    }

    return true;
  }

  // Manejar la captura de coordenadas
  async handleCapture(url, options, response) {
    try {
      let coords = null;
      let tileX = null, tileY = null;
      const detectTileSize = (lx, ly) => {
        // Preferir 1000 si los locales parecen de 0..999; si no, 3000 si 0..2999
        if (Number.isFinite(lx) && Number.isFinite(ly)) {
          if (lx >= 0 && lx < 1000 && ly >= 0 && ly < 1000) return 1000;
          if (lx >= 0 && lx < 3000 && ly >= 0 && ly < 3000) return 3000;
        }
        return 1000; // valor seguro por defecto (coincide con Guard)
      };

      // Intentar extraer coordenadas del cuerpo de la petición (múltiples formatos)
      if (options.body) {
        let bodyRaw = options.body;
        let body = null;
        try {
          if (typeof bodyRaw === 'string') {
            body = JSON.parse(bodyRaw);
          } else if (bodyRaw && typeof bodyRaw.text === 'function') {
            // Podría ser un Blob/Request body - intentar leer texto si existe
            const txt = await bodyRaw.text();
            try { body = JSON.parse(txt); } catch { body = null; }
          } else {
            body = bodyRaw;
          }
        } catch { body = null; }

        if (body) {
          const bCoords = body.coords;
          if (Array.isArray(bCoords)) {
            // Formatos aceptados: [x,y] | [[x,y]] | [{x,y}]
            if (bCoords.length >= 2 && typeof bCoords[0] === 'number' && typeof bCoords[1] === 'number') {
              coords = [bCoords[0], bCoords[1]];
            } else if (Array.isArray(bCoords[0]) && bCoords[0].length >= 2) {
              coords = [bCoords[0][0], bCoords[0][1]];
            } else if (typeof bCoords[0] === 'object' && bCoords[0] && Number.isFinite(bCoords[0].x) && Number.isFinite(bCoords[0].y)) {
              coords = [bCoords[0].x, bCoords[0].y];
            }
          } else if (Number.isFinite(body.x) && Number.isFinite(body.y)) {
            coords = [body.x, body.y];
          } else if (Array.isArray(body.coordinates) && body.coordinates.length >= 2) {
            coords = [body.coordinates[0], body.coordinates[1]];
          }
        }
      }

      // Extraer tile desde la URL si está presente
      const urlStr = url.toString();
      const tileMatch = urlStr.match(/\/s0\/pixel\/(-?\d+)\/(-?\d+)/);
      if (tileMatch) {
        tileX = parseInt(tileMatch[1]);
        tileY = parseInt(tileMatch[2]);
      }

      // Intentar extraer coords de la URL si no vinieron en el body
      if (!coords) {
        const urlCoordMatch = urlStr.match(/[?&](?:x|coords?)=([^&]+)/);
        if (urlCoordMatch) {
          const coordStr = decodeURIComponent(urlCoordMatch[1]);
          try {
            coords = JSON.parse(coordStr);
          } catch {
            const parts = coordStr.split(',');
            if (parts.length >= 2) {
              coords = [parseInt(parts[0]), parseInt(parts[1])];
            }
          }
        }
      }

      // Si encontramos coordenadas, calcular el tile
      if (coords && coords.length >= 2) {
        let globalX, globalY, localX, localY;

        if (Number.isInteger(tileX) && Number.isInteger(tileY)) {
          // Tratamos coords como locales al tile extraído de la URL
          localX = coords[0];
          localY = coords[1];
          const TILE = detectTileSize(localX, localY);
          globalX = tileX * TILE + localX;
          globalY = tileY * TILE + localY;
          log(`🎯 Coordenadas capturadas (locales): tile(${tileX},${tileY}) local(${localX},${localY}) -> global(${globalX},${globalY})`);
        } else {
          // Sin tile en URL, interpretamos coords como globales y derivamos tile
          globalX = coords[0];
          globalY = coords[1];
          const TILE = 1000; // fallback coherente con Guard
          tileX = Math.floor(globalX / TILE);
          tileY = Math.floor(globalY / TILE);
          localX = ((globalX % TILE) + TILE) % TILE;
          localY = ((globalY % TILE) + TILE) % TILE;
          log(`🎯 Coordenadas capturadas (globales): global(${globalX},${globalY}) -> tile(${tileX},${tileY}) local(${localX},${localY})`);
        }

        // Verificar que la respuesta sea exitosa
        if (response.ok) {
          this.disable();

          const payload = {
            success: true,
            tileX,
            tileY,
            globalX,
            globalY,
            localX,
            localY
          };
          // Callback local
          try { if (this.callback) this.callback(payload); } catch (e) { log('Error en callback de captura:', e); }
          // Fallback: evento global + variable global para listeners externos
          try {
            window.__wplaceLastCapture = payload;
            try {
              const ev = document.createEvent('Event');
              ev.initEvent('wplace-capture', true, true);
              ev.detail = payload;
              window.dispatchEvent(ev);
            } catch {}
          } catch {}
        } else {
          log('⚠️ Captura realizada pero la respuesta no fue exitosa');
        }
      }

    } catch (error) {
      log('Error procesando captura:', error);
    }
  }

  // Desactivar captura
  disable() {
    if (!this.active) return;
    
    this.active = false;
    window.fetch = this.originalFetch;
    this.callback = null;
    
    log('🔒 Captura de coordenadas desactivada');
  }
}

// Instancia global
export const coordinateCapture = new CoordinateCapture();
