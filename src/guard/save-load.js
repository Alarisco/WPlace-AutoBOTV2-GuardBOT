import { guardState } from './config.js';
import { log } from '../core/logger.js';
import { loadJsonWithConversion } from './json-converter.js';

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
    
    const areas = splitCount && splitCount > 1 ? 
      splitProtectionArea(guardState.protectionArea, splitCount) : 
      [guardState.protectionArea];
    
    const results = [];
    
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      const areaPixels = getPixelsInArea(area, guardState.originalPixels);
      
      const progressData = {
        version: "1.0",
        timestamp: Date.now(),
        protectionData: {
          area: { ...area },
          protectedPixels: areaPixels.length,
          splitInfo: splitCount > 1 ? { 
            total: splitCount, 
            current: i + 1,
            originalArea: { ...guardState.protectionArea }
          } : null
        },
        progress: {
          totalRepaired: guardState.totalRepaired,
          lastCheck: guardState.lastCheck
        },
        config: {
          maxProtectionSize: 100000,
          pixelsPerBatch: 10,
          checkInterval: 10000
        },
        // Filtrar solo los datos serializables de los colores (sin elementos DOM)
        colors: guardState.availableColors.map(color => ({
          id: color.id,
          r: color.r,
          g: color.g,
          b: color.b
        })),
        // Convertir Map a array para serialización - solo píxeles del área
        originalPixels: areaPixels
      };
      
      const dataStr = JSON.stringify(progressData, null, 2);
      const blob = new window.Blob([dataStr], { type: 'application/json' });
      
      const suffix = splitCount > 1 ? `_parte${i + 1}de${splitCount}` : '';
      const finalFilename = filename || 
        `wplace_GUARD_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}${suffix}.json`;
      
      // Crear y disparar descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      results.push({ success: true, filename: finalFilename });
      log(`✅ Progreso guardado: ${finalFilename}`);
    }
    
    return { 
      success: true, 
      filename: results.length === 1 ? results[0].filename : `${results.length} archivos`,
      files: results
    };
    
  } catch (error) {
    log('❌ Error guardando progreso:', error);
    return { success: false, error: error.message };
  }
}

export async function loadProgress(file) {
  try {
    // Usar la nueva función de conversión automática
    const loadResult = await loadJsonWithConversion(file);
    
    if (!loadResult.success) {
      log('❌ Error cargando archivo:', loadResult.error);
      return { success: false, error: loadResult.error };
    }
    
    const progressData = loadResult.data;
    
    // Mostrar información de conversión si aplica
    if (loadResult.converted) {
      log('🔄 JSON de Auto-Image convertido automáticamente');
      log(`📊 Estadísticas: ${loadResult.stats.protectedPixels} píxeles a proteger de ${loadResult.stats.originalPixels} originales`);
    }
    
    // Validar estructura del archivo
    const requiredFields = ['protectionData', 'originalPixels', 'colors'];
    const missingFields = requiredFields.filter(field => !(field in progressData));
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }
    
    // Verificar compatibilidad de colores
    if (guardState.availableColors.length > 0) {
      const savedColorIds = progressData.colors.map(c => c.id);
      const currentColorIds = guardState.availableColors.map(c => c.id);
      const commonColors = savedColorIds.filter(id => currentColorIds.includes(id));
      
      if (commonColors.length < savedColorIds.length * 0.8) {
        log('⚠️ Los colores guardados no coinciden completamente con los actuales');
      }
    }
    
    // Si no hay colores detectados aún, poblarlos desde el archivo
    if (!guardState.availableColors || guardState.availableColors.length === 0) {
      guardState.availableColors = Array.isArray(progressData.colors)
        ? progressData.colors.map(c => ({ id: c.id, r: c.r, g: c.g, b: c.b }))
        : [];
      log(`🎨 Colores cargados desde archivo: ${guardState.availableColors.length}`);
    }
    
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
    
    // Convertir array de píxeles de vuelta a Map
    guardState.originalPixels = new Map();
    for (const pixelData of progressData.originalPixels) {
      const { key, ...pixelInfo } = pixelData;
      guardState.originalPixels.set(key, pixelInfo);
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
    
    return { 
      success: true, 
      data: progressData,
      protectedPixels: guardState.originalPixels.size,
      area: guardState.protectionArea,
      converted: loadResult.converted || false,
      stats: loadResult.stats
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

// Alias para compatibilidad
export const saveGuardData = saveProgress;
export const loadGuardData = loadProgress;
export const clearGuardData = clearProgress;
export const hasGuardData = hasProgress;
export const getGuardDataInfo = getProgressInfo;
