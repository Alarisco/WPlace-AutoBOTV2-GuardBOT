import { guardState, GUARD_DEFAULTS } from './config.js';
import { log } from '../core/logger.js';

// ===== OPTIMIZACIÓN DE COMPRESIÓN INSPIRADA EN AUTO-REPAIR =====
// Funciones para comprimir datos de píxeles usando bits en lugar de arrays completos

/**
 * Comprime un mapa de píxeles pintados a Base64 usando compresión de bits
 * Reduce significativamente el tamaño del archivo (de ~200MB a ~35MB)
 */
function packPaintedMapToBase64(paintedMap, width, height) {
  if (!paintedMap || !width || !height) return null;
  
  if (!window || !window.btoa) {
    console.warn('btoa no disponible, usando compresión alternativa');
    return null;
  }

  let bytes;
  if (paintedMap instanceof Uint8Array) {
    bytes = paintedMap;
  } else {
    // Compatibilidad: aceptar mapas 2D legado
    const totalBits = width * height;
    const byteLen = Math.ceil(totalBits / 8);
    bytes = new Uint8Array(byteLen);
    let bitIndex = 0;
    for (let y = 0; y < height; y++) {
      const row = paintedMap[y];
      for (let x = 0; x < width; x++) {
        const bit = row && row[x] ? 1 : 0;
        const b = bitIndex >> 3;
        const o = bitIndex & 7;
        if (bit) bytes[b] |= 1 << o;
        bitIndex++;
      }
    }
  }

  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, Math.min(i + chunk, bytes.length))
    );
  }
  
  return window.btoa(binary);
}

/**
 * Descomprime un mapa de píxeles desde Base64
 */
function unpackPaintedMapFromBase64(base64, width, height) {
  if (!base64 || !width || !height) return null;
  
  // Verificar disponibilidad de atob
  if (!window || !window.atob) {
    console.warn('atob no disponible, usando descompresión alternativa');
    return null;
  }
  
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const expectedLength = Math.ceil((width * height) / 8);
  if (bytes.length !== expectedLength) {
    console.warn(`paintedMapPacked longitud inesperada: ${bytes.length} (esperado ${expectedLength})`);
  }

  return bytes;
}

/**
 * Convierte los píxeles del Guard a un formato comprimido optimizado
 * Usa solo las coordenadas esenciales en lugar del array completo
 */
function compressPixelData(originalPixels, area) {
  if (!originalPixels || originalPixels.size === 0) return null;
  
  const compressed = [];
  const useArea = Boolean(area);
  const bounds = useArea ? {
    x1: area.x1,
    y1: area.y1,
    x2: area.x2,
    y2: area.y2
  } : null;

  for (const [_key, pixel] of originalPixels) {
    if (useArea) {
      if (pixel.globalX < bounds.x1 || pixel.globalX >= bounds.x2) continue;
      if (pixel.globalY < bounds.y1 || pixel.globalY >= bounds.y2) continue;
    }

    compressed.push({
      x: pixel.globalX,
      y: pixel.globalY,
      color: pixel.colorId
    });
  }
  
  return compressed;
}

/**
 * Crea un mapa de píxeles pintados optimizado para compresión
 */
function createPaintedMapForCompression(originalPixels, area) {
  if (!originalPixels || !area) return null;
  
  const width = area.x2 - area.x1;
  const height = area.y2 - area.y1;
  if (width <= 0 || height <= 0) return null;

  const totalBits = width * height;
  const bytes = new Uint8Array(Math.ceil(totalBits / 8));
  
  // Marcar píxeles que han sido procesados/pintados
  for (const [_key, pixel] of originalPixels) {
    const localX = pixel.globalX - area.x1;
    const localY = pixel.globalY - area.y1;
    
    if (localX >= 0 && localX < width && localY >= 0 && localY < height) {
      const bitIndex = localY * width + localX;
      const byteIndex = bitIndex >> 3;
      const offset = bitIndex & 7;
      bytes[byteIndex] |= 1 << offset;
    }
  }
  
  return bytes;
}

/**
 * Calcula estadísticas de compresión para mostrar al usuario
 */
function calculateCompressionStats(originalPixels, area, paintedMapPacked) {
  if (!originalPixels || !area) return null;
  
  const width = area.x2 - area.x1;
  const height = area.y2 - area.y1;
  const totalAreaPixels = width * height;
  const protectedPixels = originalPixels.size;
  
  // Estimar tamaño sin compresión (formato legacy)
  const legacyPixelSize = 50; // bytes aproximados por pixel en JSON
  const legacyEstimatedSize = protectedPixels * legacyPixelSize;
  
  // Estimar tamaño con compresión
  const compressedPixelSize = 12; // bytes aproximados por pixel comprimido
  const compressedPixelData = protectedPixels * compressedPixelSize;
  const paintedMapSize = paintedMapPacked ? paintedMapPacked.length : 0;
  const compressedEstimatedSize = compressedPixelData + paintedMapSize;
  
  const compressionRatio = legacyEstimatedSize > 0 ? (legacyEstimatedSize - compressedEstimatedSize) / legacyEstimatedSize : 0;
  
  return {
    totalAreaPixels,
    protectedPixels,
    legacyEstimatedSize: Math.round(legacyEstimatedSize / 1024 / 1024 * 100) / 100, // MB
    compressedEstimatedSize: Math.round(compressedEstimatedSize / 1024 / 1024 * 100) / 100, // MB
    compressionRatio: Math.round(compressionRatio * 100), // Porcentaje
    spaceSaved: Math.round((legacyEstimatedSize - compressedEstimatedSize) / 1024 / 1024 * 100) / 100 // MB
  };
}

// Enhanced download system inspired by Art-Extractor
function downloadWithBlob(data, filename) {
  try {
    const dataStr = JSON.stringify(data);
    const blob = new window.Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    log('❌ Error en descarga con Blob:', error);
    return false;
  }
}

// Validate save data before export
function validateSaveData(data) {
  const requiredFields = ['protectionData', 'originalPixels'];
  const missingFields = requiredFields.filter(field => !(field in data));
  
  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }
  
  if (!data.protectionData.area) {
    throw new Error('Área de protección no definida');
  }
  
  if (!Array.isArray(data.originalPixels) || data.originalPixels.length === 0) {
    throw new Error('No hay píxeles para exportar');
  }
  
  return true;
}

// Generate filename with validation
function generateFilename(userFilename = null, splitInfo = null, exportType = 'GUARD') {
  let filename;
  
  if (userFilename && userFilename.trim() !== '') {
    // Ensure filename ends with .json
    filename = userFilename.trim().endsWith('.json') ? 
      userFilename.trim() : 
      userFilename.trim() + '.json';
  } else {
    // Generate default filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    filename = `wplace_${exportType}_${timestamp}.json`;
  }
  
  // Add split suffix if needed
  if (splitInfo && splitInfo.total > 1) {
    const baseName = filename.replace('.json', '');
    filename = `${baseName}_parte${splitInfo.current}de${splitInfo.total}.json`;
  }
  
  return filename;
}

// Validate filename format
function validateFilename(filename) {
  if (!filename || typeof filename !== 'string') {
    return false;
  }
  
  const trimmed = filename.trim();
  if (trimmed.length === 0 || trimmed === '.json') {
    return false;
  }
  
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(trimmed)) {
    return false;
  }
  
  return true;
}

// Función para dividir el área de protección en múltiples partes
function splitProtectionArea(area, splitCount) {
  const { x1, y1, x2, y2 } = area;
  const width = x2 - x1;
  const height = y2 - y1;
  const areas = [];
  
  if (splitCount <= 1) {
    return [area];
  }
  
  // Determinar si dividir horizontal o verticalmente basado en las dimensiones
  const divideHorizontally = width >= height;
  
  if (divideHorizontally) {
    const segmentWidth = Math.floor(width / splitCount);
    for (let i = 0; i < splitCount; i++) {
      const startX = x1 + (i * segmentWidth);
      const endX = i === splitCount - 1 ? x2 : startX + segmentWidth;
      areas.push({
        x1: startX,
        y1: y1,
        x2: endX,
        y2: y2
      });
    }
  } else {
    const segmentHeight = Math.floor(height / splitCount);
    for (let i = 0; i < splitCount; i++) {
      const startY = y1 + (i * segmentHeight);
      const endY = i === splitCount - 1 ? y2 : startY + segmentHeight;
      areas.push({
        x1: x1,
        y1: startY,
        x2: x2,
        y2: endY
      });
    }
  }
  
  return areas;
}

// Función para obtener píxeles dentro de un área específica
function getPixelsInArea(area, pixelsMap) {
  const pixels = [];
  const { x1, y1, x2, y2 } = area;
  
  for (const [key, value] of pixelsMap.entries()) {
    const [x, y] = key.split(',').map(Number);
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      pixels.push({ key, ...value });
    }
  }
  
  return pixels;
}

export function saveProgress(filename = null, splitCount = null) {
  try {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      throw new Error('No hay progreso para guardar');
    }
    
    // Validate filename if provided
    if (filename && !validateFilename(filename)) {
      throw new Error('Nombre de archivo inválido');
    }
    
    const areas = splitCount && splitCount > 1 ? 
      splitProtectionArea(guardState.protectionArea, splitCount) : 
      [guardState.protectionArea];
    
    const results = [];
    
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      const areaPixels = getPixelsInArea(area, guardState.originalPixels);
      
      // NUEVA OPTIMIZACIÓN: Usar compresión de datos como Auto-Repair
      const width = area.x2 - area.x1;
      const height = area.y2 - area.y1;
      const paintedMap = createPaintedMapForCompression(guardState.originalPixels, area);
      const compressedPixels = compressPixelData(guardState.originalPixels, area);
      const paintedMapPacked = packPaintedMapToBase64(paintedMap, width, height);
      
      const progressData = {
        version: "1.2", // Nueva versión con compresión optimizada
        timestamp: Date.now(),
        protectionData: {
          area: { ...area },
          protectedPixels: areaPixels.length,
          splitInfo: splitCount > 1 ? { 
            total: splitCount, 
            current: i + 1,
            originalArea: { ...guardState.protectionArea }
          } : null,
          // Enhanced metadata
          areaSize: {
            width: width,
            height: height,
            totalPixels: width * height
          },
          exportMethod: 'enhanced_blob_download_compressed'
        },
        progress: {
          totalRepaired: guardState.totalRepaired,
          lastCheck: guardState.lastCheck,
          // Additional progress metadata
          repairRate: guardState.totalRepaired > 0 ? 
            (guardState.totalRepaired / areaPixels.length * 100).toFixed(2) + '%' : '0%'
        },
        config: {
          maxProtectionSize: 100000,
          pixelsPerBatch: guardState.pixelsPerBatch,
          checkInterval: 10000
        },
        // Filtrar solo los datos serializables de los colores (sin elementos DOM)
        colors: guardState.availableColors.map(color => ({
          id: color.id,
          r: color.r,
          g: color.g,
          b: color.b
        })),
        // DATOS OPTIMIZADOS: Usar compresión en lugar del array completo
        originalPixels: compressedPixels, // Solo coordenadas esenciales
        paintedMapPacked: paintedMapPacked, // Mapa comprimido en base64
        // Mantener compatibilidad con versiones anteriores
        legacyPixels: areaPixels.length < 10000 ? areaPixels : null // Solo para áreas pequeñas
      };
      
      // Validate data before saving
      validateSaveData(progressData);
      
      // Generate filename with enhanced logic
      const splitInfo = splitCount > 1 ? { total: splitCount, current: i + 1 } : null;
      const finalFilename = generateFilename(filename, splitInfo, 'GUARD');
      
      // Use enhanced blob download system
      const downloadSuccess = downloadWithBlob(progressData, finalFilename);
      
      if (!downloadSuccess) {
        throw new Error(`Error descargando archivo: ${finalFilename}`);
      }
      
      // Calcular y mostrar estadísticas de compresión
      const compressionStats = calculateCompressionStats(guardState.originalPixels, area, paintedMapPacked);
      
      results.push({ 
        success: true, 
        filename: finalFilename,
        compressionStats: compressionStats
      });
      
      if (compressionStats) {
        log(`✅ Progreso guardado con compresión optimizada: ${finalFilename}`);
        log(`📊 Compresión: ${compressionStats.legacyEstimatedSize}MB → ${compressionStats.compressedEstimatedSize}MB (${compressionStats.compressionRatio}% reducción, ${compressionStats.spaceSaved}MB ahorrados)`);
      } else {
        log(`✅ Progreso guardado con compresión optimizada: ${finalFilename}`);
      }
    }
    
    return { 
      success: true, 
      filename: results.length === 1 ? results[0].filename : `${results.length} archivos`,
      files: results,
      enhanced: true, // Flag to indicate enhanced save system was used
      compressed: true // Flag to indicate compression was used
    };
    
  } catch (error) {
    log('❌ Error guardando progreso:', error);
    return { success: false, error: error.message };
  }
}

export async function loadProgress(file) {
  try {
    const text = await file.text();
    const progressData = JSON.parse(text);
    
    log('📁 Archivo cargado correctamente');
    
    // Enhanced validation with backward compatibility
    const requiredFields = ['protectionData', 'originalPixels'];
    const missingFields = requiredFields.filter(field => !(field in progressData));
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }
    
    // Validate data integrity
    validateSaveData(progressData);
    
    // Log version information for debugging
    const version = progressData.version || '1.0';
    const isEnhanced = version === '1.1' || version === '1.2' || progressData.protectionData?.exportMethod === 'enhanced_blob_download';
    const isCompressed = version === '1.2';
    log(`📋 Versión del archivo: ${version}${isEnhanced ? ' (mejorado)' : ' (clásico)'}${isCompressed ? ' (comprimido)' : ''}`);
    
    // Verificar compatibilidad de colores
    const savedColorsArray = Array.isArray(progressData.colors)
      ? progressData.colors
      : [];

    if (guardState.availableColors.length > 0 && savedColorsArray.length > 0) {
      const savedColorIds = savedColorsArray.map(c => c.id);
      const currentColorIds = guardState.availableColors.map(c => c.id);
      const commonColors = savedColorIds.filter(id => currentColorIds.includes(id));
      
      if (commonColors.length < savedColorIds.length * 0.8) {
        log('⚠️ Los colores guardados no coinciden completamente con los actuales');
      }
    }
    
    // Si no hay colores detectados aún, poblarlos desde el archivo
    if (!guardState.availableColors || guardState.availableColors.length === 0) {
      guardState.availableColors = savedColorsArray.map(c => ({ id: c.id, r: c.r, g: c.g, b: c.b }));
      log(`🎨 Colores cargados desde archivo: ${guardState.availableColors.length}`);
    }

    const colorLookup = new Map(
      guardState.availableColors.map(color => [color.id, color])
    );
    const loadTimestamp = Date.now();
    
    // Restaurar estado
    if (progressData.protectionData) {
      guardState.protectionArea = progressData.protectionData.area;
      // Establecer si es área virtual basándose en los metadatos
      guardState.isVirtualArea = progressData.protectionData.virtualArea || false;
    } else if (progressData.protectionArea) {
      // Compatibilidad con formato anterior
      guardState.protectionArea = progressData.protectionArea;
      guardState.isVirtualArea = false;
    }
    
    // NUEVA LÓGICA: Manejar datos comprimidos (v1.2) y legacy (v1.1)
    guardState.originalPixels = new Map();
    
    if (isCompressed && progressData.originalPixels && Array.isArray(progressData.originalPixels)) {
      // Formato comprimido v1.2: originalPixels contiene solo coordenadas esenciales
      log('📦 Cargando datos comprimidos v1.2');
      for (const pixel of progressData.originalPixels) {
        const key = `${pixel.x},${pixel.y}`;
        
        // Encontrar el color correspondiente al colorId
        const colorInfo = colorLookup.get(pixel.color);
        const r = colorInfo ? colorInfo.r : 0;
        const g = colorInfo ? colorInfo.g : 0;
        const b = colorInfo ? colorInfo.b : 0;
        
        // Calcular tile y coordenadas locales
        const tileX = Math.floor(pixel.x / GUARD_DEFAULTS.TILE_SIZE);
        const tileY = Math.floor(pixel.y / GUARD_DEFAULTS.TILE_SIZE);
        const localXRaw = pixel.x - (tileX * GUARD_DEFAULTS.TILE_SIZE);
        const localYRaw = pixel.y - (tileY * GUARD_DEFAULTS.TILE_SIZE);
        const localX = ((localXRaw % 1000) + 1000) % 1000;
        const localY = ((localYRaw % 1000) + 1000) % 1000;
        
        guardState.originalPixels.set(key, {
          globalX: pixel.x,
          globalY: pixel.y,
          tileX,
          tileY,
          localX,
          localY,
          colorId: pixel.color,
          r: r,
          g: g,
          b: b,
          timestamp: pixel.timestamp || loadTimestamp
        });
      }
      
      // Si hay mapa pintado comprimido, descomprimirlo para validación
      if (progressData.paintedMapPacked && progressData.protectionData.areaSize) {
        const { width, height } = progressData.protectionData.areaSize;
        const paintedMapBytes = unpackPaintedMapFromBase64(progressData.paintedMapPacked, width, height);
        if (paintedMapBytes) {
          log(`✅ Mapa pintado descomprimido (${paintedMapBytes.length} bytes)`);
        }
      }
      
    } else if (progressData.originalPixels && Array.isArray(progressData.originalPixels)) {
      // Formato legacy v1.1 y v1.0: originalPixels puede contener objetos con key
      log('📦 Cargando datos legacy v1.1/v1.0');
      for (const pixelData of progressData.originalPixels) {
        if (pixelData.key) {
          // Formato con key explícita
          const { key, ...pixelInfo } = pixelData;
          // Derivar coordenadas globales desde key o campos existentes
          const [kx, ky] = key.split(',').map(Number);
          const globalX = Number.isFinite(pixelInfo.globalX) ? pixelInfo.globalX : (Number.isFinite(pixelInfo.x) ? pixelInfo.x : kx);
          const globalY = Number.isFinite(pixelInfo.globalY) ? pixelInfo.globalY : (Number.isFinite(pixelInfo.y) ? pixelInfo.y : ky);
          const colorId = Number.isFinite(pixelInfo.colorId) ? pixelInfo.colorId : (Number.isFinite(pixelInfo.color) ? pixelInfo.color : 0);
          const colorInfo = colorLookup.get(colorId);
          const r = colorInfo ? colorInfo.r : (Number.isFinite(pixelInfo.r) ? pixelInfo.r : 0);
          const g = colorInfo ? colorInfo.g : (Number.isFinite(pixelInfo.g) ? pixelInfo.g : 0);
          const b = colorInfo ? colorInfo.b : (Number.isFinite(pixelInfo.b) ? pixelInfo.b : 0);
          // Calcular tile y coordenadas locales
          const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
          const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
          const localXRaw = globalX - (tileX * GUARD_DEFAULTS.TILE_SIZE);
          const localYRaw = globalY - (tileY * GUARD_DEFAULTS.TILE_SIZE);
          const localX = ((localXRaw % 1000) + 1000) % 1000;
          const localY = ((localYRaw % 1000) + 1000) % 1000;
          guardState.originalPixels.set(key, {
            globalX,
            globalY,
            tileX,
            tileY,
            localX,
            localY,
            colorId,
            r,
            g,
            b,
            timestamp: pixelInfo.timestamp || loadTimestamp
          });
        } else {
          // Formato directo con coordenadas
          const key = `${pixelData.x},${pixelData.y}`;
          const globalX = pixelData.x;
          const globalY = pixelData.y;
          const colorId = Number.isFinite(pixelData.colorId) ? pixelData.colorId : (Number.isFinite(pixelData.color) ? pixelData.color : 0);
          const colorInfo = colorLookup.get(colorId);
          const r = colorInfo ? colorInfo.r : (Number.isFinite(pixelData.r) ? pixelData.r : 0);
          const g = colorInfo ? colorInfo.g : (Number.isFinite(pixelData.g) ? pixelData.g : 0);
          const b = colorInfo ? colorInfo.b : (Number.isFinite(pixelData.b) ? pixelData.b : 0);
          // Calcular tile y coordenadas locales
          const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
          const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
          const localXRaw = globalX - (tileX * GUARD_DEFAULTS.TILE_SIZE);
          const localYRaw = globalY - (tileY * GUARD_DEFAULTS.TILE_SIZE);
          const localX = ((localXRaw % 1000) + 1000) % 1000;
          const localY = ((localYRaw % 1000) + 1000) % 1000;
          guardState.originalPixels.set(key, {
            globalX,
            globalY,
            tileX,
            tileY,
            localX,
            localY,
            colorId,
            r,
            g,
            b,
            timestamp: pixelData.timestamp || loadTimestamp
          });
        }
      }
    } else if (progressData.legacyPixels && Array.isArray(progressData.legacyPixels)) {
      // Fallback: usar legacyPixels si está disponible
      log('📦 Usando datos de fallback legacy');
      for (const pixelData of progressData.legacyPixels) {
        const { key, ...pixelInfo } = pixelData;
        const [kx, ky] = key.split(',').map(Number);
        const globalX = Number.isFinite(pixelInfo.globalX) ? pixelInfo.globalX : (Number.isFinite(pixelInfo.x) ? pixelInfo.x : kx);
        const globalY = Number.isFinite(pixelInfo.globalY) ? pixelInfo.globalY : (Number.isFinite(pixelInfo.y) ? pixelInfo.y : ky);
        const colorId = Number.isFinite(pixelInfo.colorId) ? pixelInfo.colorId : (Number.isFinite(pixelInfo.color) ? pixelInfo.color : 0);
  const colorInfo = colorLookup.get(colorId);
        const r = colorInfo ? colorInfo.r : (Number.isFinite(pixelInfo.r) ? pixelInfo.r : 0);
        const g = colorInfo ? colorInfo.g : (Number.isFinite(pixelInfo.g) ? pixelInfo.g : 0);
        const b = colorInfo ? colorInfo.b : (Number.isFinite(pixelInfo.b) ? pixelInfo.b : 0);
        const tileX = Math.floor(globalX / GUARD_DEFAULTS.TILE_SIZE);
        const tileY = Math.floor(globalY / GUARD_DEFAULTS.TILE_SIZE);
        const localXRaw = globalX - (tileX * GUARD_DEFAULTS.TILE_SIZE);
        const localYRaw = globalY - (tileY * GUARD_DEFAULTS.TILE_SIZE);
        const localX = ((localXRaw % 1000) + 1000) % 1000;
        const localY = ((localYRaw % 1000) + 1000) % 1000;
        guardState.originalPixels.set(key, {
          globalX,
          globalY,
          tileX,
          tileY,
          localX,
          localY,
          colorId,
          r,
          g,
          b,
          timestamp: pixelInfo.timestamp || loadTimestamp
        });
      }
    } else {
      throw new Error('No se encontraron datos de píxeles válidos');
    }
    
    // Restaurar estadísticas si están disponibles
    if (progressData.progress) {
      guardState.totalRepaired = progressData.progress.totalRepaired || 0;
      guardState.lastCheck = progressData.progress.lastCheck || 0;
    } else if (progressData.statistics) {
      // Compatibilidad con formato anterior
      guardState.totalRepaired = progressData.statistics.totalRepaired || 0;
      guardState.lastCheck = progressData.statistics.lastCheck || 0;
    }
    
    // Limpiar cambios previos
    guardState.changes.clear();
    
    // Actualizar UI con los datos cargados
    if (guardState.ui) {
      guardState.ui.updateCoordinates({
        x1: guardState.protectionArea.x1,
        y1: guardState.protectionArea.y1,
        x2: guardState.protectionArea.x2,
        y2: guardState.protectionArea.y2
      });
      
      guardState.ui.updateProgress(guardState.originalPixels.size, 0);
      guardState.ui.updateStats({
        repaired: guardState.totalRepaired
      });
      
      guardState.ui.enableStartBtn();
    }
    
    log(`✅ Progreso cargado: ${guardState.originalPixels.size} píxeles protegidos`);
    
    // Si este slave está conectado al servidor y es favorito, enviar datos de preview
    if (window.wplaceSlave && window.wplaceSlave.isFavorite) {
      try {
        // Enviar datos de preview al servidor
        const previewData = {
          protectedArea: {
            x: guardState.protectionArea.x1,
            y: guardState.protectionArea.y1,
            width: guardState.protectionArea.x2 - guardState.protectionArea.x1,
            height: guardState.protectionArea.y2 - guardState.protectionArea.y1
          },
          totalPixels: guardState.originalPixels.size,
          changes: Array.from(guardState.changes.values()),
          lastCheck: guardState.lastCheck,
          isVirtualArea: guardState.isVirtualArea || false
        };
        
        window.wplaceSlave.sendToMaster({
          type: 'preview_data',
          data: previewData
        });
        
        log('📡 Datos de preview enviados al servidor');
      } catch (error) {
        log('❌ Error enviando datos de preview:', error);
      }
    }
    
    const pixelsCount = guardState.originalPixels.size;
    
    return { 
      success: true, 
      data: progressData,
      protectedPixels: pixelsCount,
      area: guardState.protectionArea,
      version: version,
      enhanced: isEnhanced,
      compressed: isCompressed
    };
    
  } catch (error) {
    log('❌ Error cargando progreso:', error);
    return { success: false, error: error.message };
  }
}

export function clearProgress() {
  guardState.protectionArea = null;
  guardState.originalPixels.clear();
  guardState.changes.clear();
  guardState.totalRepaired = 0;
  guardState.lastCheck = 0;
  
  if (guardState.ui) {
    guardState.ui.updateCoordinates({ x1: '', y1: '', x2: '', y2: '' });
    guardState.ui.updateProgress(0, 0);
    guardState.ui.updateStats({ repaired: 0 });
  }
  
  log('🧹 Progreso limpiado');
}

export function hasProgress() {
  return guardState.protectionArea && 
         guardState.originalPixels.size > 0;
}

export function getProgressInfo() {
  return {
    hasProgress: hasProgress(),
    protectedPixels: guardState.originalPixels.size,
    totalRepaired: guardState.totalRepaired,
    area: guardState.protectionArea ? {
      width: guardState.protectionArea.x2 - guardState.protectionArea.x1,
      height: guardState.protectionArea.y2 - guardState.protectionArea.y1,
      x1: guardState.protectionArea.x1,
      y1: guardState.protectionArea.y1,
      x2: guardState.protectionArea.x2,
      y2: guardState.protectionArea.y2
    } : null
  };
}

// Enhanced export functions inspired by Art-Extractor
export function saveProgressEnhanced(filename = null, splitCount = null, options = {}) {
  const defaultOptions = {
    includeMetadata: true,
    validateBeforeSave: true,
    useEnhancedDownload: true,
    logProgress: true
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  if (finalOptions.logProgress) {
    log(`🚀 Guardando con sistema mejorado: ${finalOptions.useEnhancedDownload ? 'Blob' : 'tradicional'}`);
  }
  
  return saveProgress(filename, splitCount);
}

// Export in different formats
export function exportForAutoRepair(filename = null) {
  try {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      throw new Error('No hay datos para exportar para Auto-Repair');
    }
    
    const area = guardState.protectionArea;
    const width = area.x2 - area.x1;
    const height = area.y2 - area.y1;
    const areaPixels = getPixelsInArea(area, guardState.originalPixels);
    
    // Usar compresión optimizada para Auto-Repair
    const paintedMap = createPaintedMapForCompression(guardState.originalPixels, area);
    const compressedPixels = compressPixelData(guardState.originalPixels, area);
    const paintedMapPacked = packPaintedMapToBase64(paintedMap, width, height);
    
    const autoRepairData = {
      version: "2.2", // Usar versión compatible con Auto-Repair
      timestamp: Date.now(),
      exportType: 'auto-repair',
      protectionData: {
        area: { ...area },
        protectedPixels: areaPixels.length,
        exportMethod: 'enhanced_blob_download_compressed'
      },
      repairData: {
        totalPixels: areaPixels.length,
        repairedPixels: guardState.totalRepaired,
        pendingRepairs: areaPixels.length - guardState.totalRepaired,
        lastCheck: guardState.lastCheck
      },
      // Datos optimizados como Auto-Repair
      pixels: compressedPixels, // Solo coordenadas esenciales
      paintedMapPacked: paintedMapPacked, // Mapa comprimido
      imageData: {
        width: width,
        height: height,
        totalPixels: width * height
      },
      colors: guardState.availableColors.map(color => ({
        id: color.id,
        r: color.r,
        g: color.g,
        b: color.b
      }))
    };
    
    validateSaveData(autoRepairData);
    
    const finalFilename = generateFilename(filename, null, 'AUTO-REPAIR');
    const success = downloadWithBlob(autoRepairData, finalFilename);
    
    if (success) {
      const compressionStats = calculateCompressionStats(guardState.originalPixels, area, paintedMapPacked);
      log(`✅ Datos exportados para Auto-Repair (comprimido): ${finalFilename}`);
      if (compressionStats) {
        log(`📊 Compresión Auto-Repair: ${compressionStats.legacyEstimatedSize}MB → ${compressionStats.compressedEstimatedSize}MB (${compressionStats.compressionRatio}% reducción)`);
      }
      return { success: true, filename: finalFilename, format: 'auto-repair-compressed', compressionStats };
    } else {
      throw new Error('Error en la descarga');
    }
    
  } catch (error) {
    log('❌ Error exportando para Auto-Repair:', error);
    return { success: false, error: error.message };
  }
}

// Batch export function
export function batchExport(formats = ['guard', 'auto-repair'], baseFilename = null) {
  const results = [];
  
  try {
    if (formats.includes('guard')) {
      const guardResult = saveProgress(baseFilename ? `${baseFilename}_guard` : null);
      results.push({ format: 'guard', ...guardResult });
    }
    
    if (formats.includes('auto-repair')) {
      const repairResult = exportForAutoRepair(baseFilename ? `${baseFilename}_repair` : null);
      results.push({ format: 'auto-repair', ...repairResult });
    }
    
    const successCount = results.filter(r => r.success).length;
    log(`📦 Exportación por lotes completada: ${successCount}/${results.length} exitosos`);
    
    return {
      success: successCount > 0,
      results: results,
      totalExports: results.length,
      successfulExports: successCount
    };
    
  } catch (error) {
    log('❌ Error en exportación por lotes:', error);
    return { success: false, error: error.message, results: results };
  }
}

// Alias para compatibilidad
export const saveGuardData = saveProgress;
export const loadGuardData = loadProgress;
export const clearGuardData = clearProgress;
export const hasGuardData = hasProgress;
export const getGuardDataInfo = getProgressInfo;

// New enhanced aliases
// Función para guardar en formato legacy (sin compresión) si es necesario
export function saveProgressLegacy(filename = null, splitCount = null) {
  try {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      throw new Error('No hay datos para guardar');
    }

    let areas = [guardState.protectionArea];
    let splitInfo = null;

    if (splitCount && splitCount > 1) {
      areas = splitProtectionArea(guardState.protectionArea, splitCount);
      splitInfo = {
        total: splitCount,
        areas: areas.length
      };
    }

    const results = [];
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      const areaPixels = getPixelsInArea(area, guardState.originalPixels);
      
      const progressData = {
        version: "1.1", // Versión legacy sin compresión
        timestamp: Date.now(),
        protectionData: {
          area: { ...area },
          protectedPixels: areaPixels.length,
          splitInfo: splitInfo,
          areaSize: {
            width: area.x2 - area.x1,
            height: area.y2 - area.y1,
            totalPixels: (area.x2 - area.x1) * (area.y2 - area.y1)
          },
          exportMethod: 'enhanced_blob_download'
        },
        progress: {
          totalRepaired: guardState.totalRepaired,
          lastCheck: guardState.lastCheck,
          repairRate: guardState.totalRepaired / areaPixels.length
        },
        config: { ...guardState.config },
        colors: guardState.availableColors.map(color => ({
          id: color.id,
          r: color.r,
          g: color.g,
          b: color.b
        })),
        originalPixels: areaPixels // Formato completo sin compresión
      };

      validateSaveData(progressData);
      
      const areaFilename = generateFilename(filename, splitInfo ? { current: i + 1, total: areas.length } : null, 'LEGACY');
      const success = downloadWithBlob(progressData, areaFilename);
      
      if (success) {
        results.push({ success: true, filename: areaFilename, area: i + 1 });
        log(`✅ Progreso guardado (formato legacy): ${areaFilename}`);
      } else {
        throw new Error(`Error guardando área ${i + 1}`);
      }
    }

    return {
      success: true,
      files: results,
      totalAreas: areas.length,
      format: 'guard-v1.1-legacy'
    };

  } catch (error) {
    log('❌ Error guardando progreso legacy:', error);
    return { success: false, error: error.message };
  }
}

export const saveEnhanced = saveProgressEnhanced;
export const exportAutoRepair = exportForAutoRepair;
export const batchSave = batchExport;
export const saveLegacy = saveProgressLegacy;
