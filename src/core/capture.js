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

      // Intentar extraer coordenadas del cuerpo de la petición
      if (options.body) {
        let body;
        
        if (typeof options.body === 'string') {
          try {
            body = JSON.parse(options.body);
          } catch {
            body = options.body;
          }
        } else {
          body = options.body;
        }

        // Buscar coordenadas en diferentes formatos
        if (body.coords && Array.isArray(body.coords)) {
          coords = body.coords;
        } else if (body.x !== undefined && body.y !== undefined) {
          coords = [body.x, body.y];
        } else if (body.coordinates) {
          coords = body.coordinates;
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
          globalX = tileX * 3000 + localX;
          globalY = tileY * 3000 + localY;
          log(`🎯 Coordenadas capturadas (locales): tile(${tileX},${tileY}) local(${localX},${localY}) -> global(${globalX},${globalY})`);
        } else {
          // Sin tile en URL, interpretamos coords como globales y derivamos tile
          globalX = coords[0];
          globalY = coords[1];
          tileX = Math.floor(globalX / 3000);
          tileY = Math.floor(globalY / 3000);
          localX = globalX % 3000;
          localY = globalY % 3000;
          log(`🎯 Coordenadas capturadas (globales): global(${globalX},${globalY}) -> tile(${tileX},${tileY}) local(${localX},${localY})`);
        }

        // Verificar que la respuesta sea exitosa
        if (response.ok) {
          this.disable();
          
          if (this.callback) {
            this.callback({
              success: true,
              tileX,
              tileY,
              globalX,
              globalY,
              localX,
              localY
            });
          }
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
