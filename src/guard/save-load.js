import { log } from "../core/logger.js";
import { guardState } from "./config.js";

export function saveGuardData(filename = null) {
  try {
    if (!guardState.protectionArea || !guardState.originalPixels.size) {
      throw new Error('No hay área de protección para guardar');
    }
    
    const guardData = {
      version: "1.0",
      timestamp: Date.now(),
      protectionArea: { ...guardState.protectionArea },
      statistics: {
        protectedPixels: guardState.originalPixels.size,
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
      // Convertir Map a array para serialización
      originalPixels: Array.from(guardState.originalPixels.entries()).map(([key, value]) => ({
        key,
        ...value
      }))
    };
    
    const dataStr = JSON.stringify(guardData, null, 2);
    const blob = new window.Blob([dataStr], { type: 'application/json' });
    
    const finalFilename = filename || `wplace_guard_area_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    // Crear y disparar descarga
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    log(`✅ Área de protección guardada: ${finalFilename}`);
    return { success: true, filename: finalFilename };
    
  } catch (error) {
    log('❌ Error guardando área de protección:', error);
    return { success: false, error: error.message };
  }
}

export async function loadGuardData(file) {
  return new Promise((resolve) => {
    try {
      const reader = new window.FileReader();
      
      reader.onload = async (e) => {
        try {
          const guardData = JSON.parse(e.target.result);
          
          // Validar estructura del archivo
          const requiredFields = ['protectionArea', 'originalPixels', 'colors'];
          const missingFields = requiredFields.filter(field => !(field in guardData));
          
          if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
          }
          
          // Verificar compatibilidad de colores
          if (guardState.availableColors.length > 0) {
            const savedColorIds = guardData.colors.map(c => c.id);
            const currentColorIds = guardState.availableColors.map(c => c.id);
            const commonColors = savedColorIds.filter(id => currentColorIds.includes(id));
            
            if (commonColors.length < savedColorIds.length * 0.8) {
              log('⚠️ Los colores guardados no coinciden completamente con los actuales');
            }
          }
          
          // Restaurar estado
          guardState.protectionArea = guardData.protectionArea;
          
          // Convertir array de píxeles de vuelta a Map
          guardState.originalPixels = new Map();
          for (const pixelData of guardData.originalPixels) {
            const { key, ...pixelInfo } = pixelData;
            guardState.originalPixels.set(key, pixelInfo);
          }
          
          // Restaurar estadísticas si están disponibles
          if (guardData.statistics) {
            guardState.totalRepaired = guardData.statistics.totalRepaired || 0;
            guardState.lastCheck = guardData.statistics.lastCheck || 0;
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
            
            guardState.ui.updateProgress(0, guardState.originalPixels.size);
            guardState.ui.updateStats({
              repaired: guardState.totalRepaired
            });
            
            guardState.ui.enableStartBtn();
          }
          
          log(`✅ Área de protección cargada: ${guardState.originalPixels.size} píxeles protegidos`);
          
          resolve({ 
            success: true, 
            data: guardData,
            protectedPixels: guardState.originalPixels.size,
            area: guardState.protectionArea
          });
          
        } catch (parseError) {
          log('❌ Error parseando archivo de área de protección:', parseError);
          resolve({ success: false, error: parseError.message });
        }
      };
      
      reader.onerror = () => {
        const error = 'Error leyendo archivo';
        log('❌', error);
        resolve({ success: false, error });
      };
      
      reader.readAsText(file);
      
    } catch (error) {
      log('❌ Error cargando área de protección:', error);
      resolve({ success: false, error: error.message });
    }
  });
}

export function clearGuardData() {
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
  
  log('🧹 Datos de protección limpiados');
}

export function hasGuardData() {
  return guardState.protectionArea && 
         guardState.originalPixels.size > 0;
}

export function getGuardDataInfo() {
  return {
    hasData: hasGuardData(),
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
