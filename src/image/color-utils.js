import { log } from "../core/logger.js";

/**
 * Utilidades avanzadas para manejo de colores
 * Basado en el algoritmo LAB de Auto-Image_exples.js para mejor precisión
 */
export class ColorUtils {
  
  /**
   * Convierte RGB a espacio de color LAB
   * @param {number} r - Componente rojo (0-255)
   * @param {number} g - Componente verde (0-255)
   * @param {number} b - Componente azul (0-255)
   * @returns {Array} [L, a, b] valores en espacio LAB
   */
  static _rgbToLab(r, g, b) {
    // sRGB -> linear
    const srgbToLinear = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    
    const rl = srgbToLinear(r);
    const gl = srgbToLinear(g);
    const bl = srgbToLinear(b);
    
    // RGB -> XYZ
    let X = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
    let Y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
    let Z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;
    
    // Normalizar con iluminante D65
    X /= 0.95047;
    Y /= 1.00000;
    Z /= 1.08883;
    
    // XYZ -> LAB
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + 16 / 116);
    const fX = f(X), fY = f(Y), fZ = f(Z);
    
    const L = 116 * fY - 16;
    const a = 500 * (fX - fY);
    const b2 = 200 * (fY - fZ);
    
    return [L, a, b2];
  }
  
  /**
   * Obtiene valores LAB con caché para mejor rendimiento
   * @param {number} r - Componente rojo (0-255)
   * @param {number} g - Componente verde (0-255)
   * @param {number} b - Componente azul (0-255)
   * @returns {Array} [L, a, b] valores en espacio LAB
   */
  static _lab(r, g, b) {
    // Inicializar caché si no existe
    if (!ColorUtils._labCache) {
      ColorUtils._labCache = new Map();
    }
    
    const key = (r << 16) | (g << 8) | b;
    let v = ColorUtils._labCache.get(key);
    if (!v) {
      v = ColorUtils._rgbToLab(r, g, b);
      ColorUtils._labCache.set(key, v);
    }
    return v;
  }
  
  /**
   * Encuentra el color más cercano en la paleta usando algoritmo LAB avanzado
   * @param {number} r - Componente rojo del color objetivo (0-255)
   * @param {number} g - Componente verde del color objetivo (0-255)
   * @param {number} b - Componente azul del color objetivo (0-255)
   * @param {Array} palette - Array de colores disponibles
   * @param {Object} options - Opciones adicionales
   * @returns {Object|null} Color más cercano de la paleta
   */
  static findClosestPaletteColor(r, g, b, palette, options = {}) {
    if (!palette || palette.length === 0) return null;
    
    const {
      useLegacyRgb = false,
      chromaPenalty = 0,
      whiteThreshold = 240,
      maxDistance = Infinity
    } = options;
    
    // Manejo especial para colores muy blancos
    if (r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold) {
      // Buscar color blanco en la paleta (ID 5 típicamente)
      const whiteColor = palette.find(color => {
        const cr = color.r || color.rgb?.r || 0;
        const cg = color.g || color.rgb?.g || 0;
        const cb = color.b || color.rgb?.b || 0;
        return cr >= whiteThreshold && cg >= whiteThreshold && cb >= whiteThreshold;
      });
      if (whiteColor) return whiteColor;
    }
    
  let closestColor = null;
  let minDistance = Infinity;
    
    if (useLegacyRgb) {
      // Algoritmo RGB tradicional
      for (const color of palette) {
        const cr = color.r || color.rgb?.r || 0;
        const cg = color.g || color.rgb?.g || 0;
        const cb = color.b || color.rgb?.b || 0;
        
        const distance = Math.sqrt(
          Math.pow(r - cr, 2) +
          Math.pow(g - cg, 2) +
          Math.pow(b - cb, 2)
        );
        
  if (distance < minDistance) {
          minDistance = distance;
          closestColor = color;
        }
      }
    } else {
      // Algoritmo LAB avanzado
      const targetLab = ColorUtils._lab(r, g, b);
      
      for (const color of palette) {
        const cr = color.r || color.rgb?.r || 0;
        const cg = color.g || color.rgb?.g || 0;
        const cb = color.b || color.rgb?.b || 0;
        
        const colorLab = ColorUtils._lab(cr, cg, cb);
        
        // Distancia euclidiana en espacio LAB
        let distance = Math.sqrt(
          Math.pow(targetLab[0] - colorLab[0], 2) +
          Math.pow(targetLab[1] - colorLab[1], 2) +
          Math.pow(targetLab[2] - colorLab[2], 2)
        );
        
        // Aplicar penalización por croma si se especifica
        if (chromaPenalty > 0) {
          const targetChroma = Math.sqrt(targetLab[1] * targetLab[1] + targetLab[2] * targetLab[2]);
          const colorChroma = Math.sqrt(colorLab[1] * colorLab[1] + colorLab[2] * colorLab[2]);
          const chromaDiff = Math.abs(targetChroma - colorChroma);
          distance += chromaDiff * chromaPenalty;
        }
        
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = color;
        }
      }
    }
    
    // Aplicar umbral de tolerancia: si el más cercano supera maxDistance, no hay alternativa válida
    if (minDistance > maxDistance) {
      return null;
    }
    return closestColor;
  }
  
  /**
   * Función de compatibilidad con la interfaz existente
   * @param {Object} rgb - Objeto con propiedades r, g, b
   * @param {Array} palette - Array de colores disponibles
   * @param {Object} options - Opciones adicionales
   * @returns {Object|null} Color más cercano de la paleta
   */
  static findClosestColor(rgb, palette, options = {}) {
    return ColorUtils.findClosestPaletteColor(rgb.r, rgb.g, rgb.b, palette, options);
  }
  
  /**
   * Limpia la caché LAB (útil para liberar memoria)
   */
  static clearCache() {
    if (ColorUtils._labCache) {
      ColorUtils._labCache.clear();
      log('Caché de colores LAB limpiada');
    }
  }
  
  /**
   * Obtiene estadísticas de la caché
   * @returns {Object} Estadísticas de uso de caché
   */
  static getCacheStats() {
    if (!ColorUtils._labCache) {
      return { size: 0, memoryEstimate: 0 };
    }
    return {
      size: ColorUtils._labCache.size,
      memoryEstimate: ColorUtils._labCache.size * 32 // Estimación aproximada en bytes
    };
  }
}

// Exportar funciones individuales para compatibilidad
export const findClosestColor = ColorUtils.findClosestColor.bind(ColorUtils);
export const findClosestPaletteColor = ColorUtils.findClosestPaletteColor.bind(ColorUtils);