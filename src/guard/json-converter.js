import { log } from '../core/logger.js';

/**
 * Convierte un JSON de Auto-Image al formato compatible con Auto-Guard
 * El problema: Auto-Image exporta todos los píxeles del dibujo, pero Auto-Guard
 * necesita solo los píxeles que actualmente existen en el mapa para protegerlos.
 */
export async function convertImageJsonToGuard(imageJsonData) {
  try {
    log('🔄 Convirtiendo JSON de Auto-Image a formato Guard...');
    
    // Validar que es un JSON de Auto-Image
    if (!imageJsonData.originalPixels || !Array.isArray(imageJsonData.originalPixels)) {
      throw new Error('El archivo no parece ser un JSON válido de Auto-Image');
    }
    
    // Extraer área de protección del JSON de Auto-Image
    const area = imageJsonData.protectionData?.area;
    if (!area) {
      throw new Error('No se encontró área de protección en el JSON');
    }
    
    log(`📊 Área detectada: (${area.x1},${area.y1}) a (${area.x2},${area.y2})`);
    log(`🎨 Píxeles en JSON: ${imageJsonData.originalPixels.length}`);
    
    // Usar directamente los píxeles de la imagen importada sin analizar el mapa
    log(`📋 Usando píxeles de la imagen importada: ${imageJsonData.originalPixels.length}`);
    
    // Convertir píxeles de Auto-Image directamente a formato Guard
    const protectedPixels = imageJsonData.originalPixels.map(pixel => ({
      key: pixel.key,
      r: pixel.r,
      g: pixel.g,
      b: pixel.b,
      colorId: pixel.colorId,
      globalX: pixel.globalX,
      globalY: pixel.globalY,
      localX: pixel.localX,
      localY: pixel.localY,
      tileX: pixel.tileX,
      tileY: pixel.tileY
    }));
    
    const matchedPixels = protectedPixels.length;
    
    log(`✅ Píxeles convertidos: ${matchedPixels}`);
    log(`🛡️ Total píxeles a proteger: ${protectedPixels.length}`);
    
    // Crear JSON compatible con Auto-Guard
    const guardJson = {
      version: "1.0",
      timestamp: Date.now(),
      protectionData: {
        area: area,
        protectedPixels: protectedPixels.length,
        splitInfo: null,
        convertedFrom: "Auto-Image",
        virtualArea: false, // No es virtual, son píxeles reales de la imagen
        originalPixelCount: imageJsonData.originalPixels.length,
        matchedPixels: matchedPixels
      },
      progress: {
        totalRepaired: 0,
        lastCheck: 0
      },
      config: {
        maxProtectionSize: 100000,
        pixelsPerBatch: 10,
        checkInterval: 10000
      },
      colors: imageJsonData.colors || [],
      originalPixels: protectedPixels
    };
    
    return {
      success: true,
      data: guardJson,
      stats: {
        originalPixels: imageJsonData.originalPixels.length,
        existingPixels: protectedPixels.length,
        matchedPixels: matchedPixels,
        protectedPixels: protectedPixels.length,
        virtualArea: false
      }
    };
    
  } catch (error) {
    log('❌ Error convirtiendo JSON:', error);
    return {
      success: false,
      error: error.message
    };
  }
}



/**
 * Detecta si un JSON es de Auto-Image basándose en su estructura
 */
export function isImageJson(jsonData) {
  return jsonData && 
         Array.isArray(jsonData.originalPixels) &&
         jsonData.protectionData &&
         jsonData.protectionData.area &&
         // Los JSON de Auto-Image tienen píxeles con coordenadas globales
         jsonData.originalPixels.some(p => p.globalX !== undefined && p.globalY !== undefined);
}

/**
 * Función principal para manejar la carga de JSON con conversión automática
 */
export async function loadJsonWithConversion(file) {
  return new Promise((resolve) => {
    const reader = new window.FileReader();
    
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        
        // Detectar si es un JSON de Auto-Image
        if (isImageJson(jsonData)) {
          log('🎨 JSON de Auto-Image detectado, convirtiendo...');
          
          const conversionResult = await convertImageJsonToGuard(jsonData);
          
          if (conversionResult.success) {
            log(`✅ Conversión exitosa: ${conversionResult.stats.protectedPixels} píxeles a proteger`);
            resolve({
              success: true,
              data: conversionResult.data,
              converted: true,
              stats: conversionResult.stats
            });
          } else {
            resolve({
              success: false,
              error: `Error en conversión: ${conversionResult.error}`,
              converted: false
            });
          }
        } else {
          // Es un JSON normal de Guard
          log('🛡️ JSON de Auto-Guard detectado');
          resolve({
            success: true,
            data: jsonData,
            converted: false
          });
        }
        
      } catch (error) {
        resolve({
          success: false,
          error: `Error parseando JSON: ${error.message}`,
          converted: false
        });
      }
    };
    
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Error leyendo archivo',
        converted: false
      });
    };
    
    reader.readAsText(file);
  });
}