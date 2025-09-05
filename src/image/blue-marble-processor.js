// === [Procesador de imágenes basado en Blue Marble] ===
import { log } from "../core/logger.js";
import { ColorUtils } from "./color-utils.js";

/**
 * Procesador de imágenes con arquitectura Blue Marble
 * Maneja chunking en tiles, factor de escalado, y sistema de coordenadas compatible
 */
export class BlueMarblelImageProcessor {
  constructor(imageSrc) {
    this.imageSrc = imageSrc;
    this.img = new window.Image();
    this.originalName = null;
    
    // Configuración Blue Marble
    this.tileSize = 1000; // Tamaño de tile en píxeles (como Blue Marble)
    this.drawMult = 3; // Factor de escalado (DEBE ser impar)
    this.shreadSize = 3; // Alias para drawMult para compatibilidad
    
    // Estado del procesamiento
    this.bitmap = null;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.totalPixels = 0;
    this.requiredPixelCount = 0;
    this.defacePixelCount = 0;
    this.colorPalette = {};
    this.allowedColorsSet = new Set();
    this.rgbToMeta = new Map();
    this.coords = [0, 0, 0, 0]; // [tileX, tileY, pixelX, pixelY]
    this.templateTiles = {};
    this.templateTilesBuffers = {};
    this.tilePrefixes = new Set();
    this.selectedColors = null; // Colores seleccionados por el usuario
    // Copias completas para restaurar cuando no hay selección
    this.allSiteColors = [];
    this.initialAllowedColorsSet = null;
    // Paleta de colores disponibles para matching de cercanía
    this.allowedColors = [];
  // Nuevo: tolerancia LAB y backups
  this.labTolerance = 100; // tolerancia LAB por defecto (intenta siempre el más próximo)
  this.originalBitmap = null; // copia sin procesar
  }

  async load() {
    return new Promise((resolve, reject) => {
      this.img.onload = async () => {
        try {
          this.bitmap = await createImageBitmap(this.img);
          this.originalBitmap = this.bitmap; // mantener referencia original
          this.imageWidth = this.bitmap.width;
          this.imageHeight = this.bitmap.height;
          this.totalPixels = this.imageWidth * this.imageHeight;
          
          log(`[BLUE MARBLE] Imagen cargada: ${this.imageWidth}×${this.imageHeight}`);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      this.img.onerror = reject;
      this.img.src = this.imageSrc;
    });
  }

  setLabTolerance(distance) {
    this.labTolerance = Number.isFinite(distance) ? Math.max(0, distance) : Infinity;
  }

  generateOriginalPreview(maxWidth = 200, maxHeight = 200) {
    // Preview de la imagen original sin remapear
    if (!this.originalBitmap) return this.generatePreview(maxWidth, maxHeight);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { width: origWidth, height: origHeight } = this.originalBitmap;
    const aspectRatio = origWidth / origHeight;
    let newWidth, newHeight;
    if (maxWidth / maxHeight > aspectRatio) {
      newHeight = maxHeight; newWidth = maxHeight * aspectRatio;
    } else { newWidth = maxWidth; newHeight = maxWidth / aspectRatio; }
    canvas.width = newWidth; canvas.height = newHeight; ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.originalBitmap, 0, 0, newWidth, newHeight);
    return canvas.toDataURL();
  }

  /**
   * Inicializa la paleta de colores desde WPlace (como Blue Marble)
   */
  initializeColorPalette() {
    log('[BLUE MARBLE] Inicializando paleta de colores...');
    
    // Usar la función importada detectAvailableColors que devuelve el formato correcto
    const availableColors = detectAvailableColors();
    
    // Construir conjunto de colores permitidos
    const filteredColors = availableColors
      .filter(c => c.id !== undefined && typeof c.r === 'number' && typeof c.g === 'number' && typeof c.b === 'number');
    
    this.allowedColorsSet = new Set(
      filteredColors.map(c => `${c.r},${c.g},${c.b}`)
    );
    
    // Asegurar que #deface (marcador de transparencia) se trate como permitido
    const defaceKey = '222,250,206';
    this.allowedColorsSet.add(defaceKey);

    // Mapear RGB a metadatos
    this.rgbToMeta = new Map(
      filteredColors.map(c => [
        `${c.r},${c.g},${c.b}`, 
        { 
          id: c.id, 
          premium: !!c.premium, 
          name: c.name || `Color ${c.id}` 
        }
      ])
    );

    // Mapear #deface a Transparent para UI (usar ID 0 como fallback)
    this.rgbToMeta.set(defaceKey, { 
      id: 0, 
      premium: false, 
      name: 'Transparent' 
    });

    // Guardar copias para restauración y matching de cercanía
    this.allSiteColors = filteredColors.map(c => ({ r: c.r, g: c.g, b: c.b, id: c.id, name: c.name, premium: !!c.premium }));
    this.initialAllowedColorsSet = new Set(this.allowedColorsSet);
    this.allowedColors = [...this.allSiteColors];

    log(`[BLUE MARBLE] Paleta inicializada: ${this.allowedColorsSet.size} colores permitidos`);
    return Array.from(availableColors);
  }

  /**
   * Detecta colores disponibles del sitio (versión mejorada de Blue Marble)
   */
  detectSiteColors() {
    const colorElements = document.querySelectorAll('[id^="color-"]');
    const colors = [];
    
    for (const element of colorElements) {
      const idStr = element.id.replace('color-', '');
      const id = parseInt(idStr);
      
      // Filtrar elementos con SVG (probablemente bloqueos)
      if (element.querySelector('svg')) {
        continue;
      }
      
      // Filtrar solo el color 0 (mantener el color blanco ID 5 disponible)
      if (id === 0) {
        continue;
      }
      
      // Obtener color RGB del style
      const backgroundStyle = element.style.backgroundColor;
      if (backgroundStyle) {
        const rgbMatch = backgroundStyle.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const rgb = [
            parseInt(rgbMatch[0]),
            parseInt(rgbMatch[1]),
            parseInt(rgbMatch[2])
          ];
          
          const colorInfo = {
            id,
            element,
            rgb,
            name: element.title || element.getAttribute('aria-label') || `Color ${id}`,
            premium: element.classList.contains('premium') || element.querySelector('.premium')
          };
          
          colors.push(colorInfo);
        }
      }
    }
    
    log(`[BLUE MARBLE] ${colors.length} colores detectados del sitio`);
    

    
    return colors;
  }

  /**
   * Establece las coordenadas de posición (como Blue Marble)
   */
  setCoords(tileX, tileY, pixelX, pixelY) {
    this.coords = [tileX, tileY, pixelX, pixelY];
    // Coordenadas establecidas silenciosamente
  }

  /**
   * Analiza píxeles de la imagen y cuenta requeridos vs #deface (como Blue Marble)
   */
  async analyzePixels() {
    if (!this.bitmap) {
      throw new Error('Imagen no cargada. Llama a load() primero.');
    }

    // Analizando píxeles...

    try {
      // Crear canvas de inspección a escala 1:1
      const inspectCanvas = new OffscreenCanvas(this.imageWidth, this.imageHeight);
      const inspectCtx = inspectCanvas.getContext('2d', { willReadFrequently: true });
      inspectCtx.imageSmoothingEnabled = false;
      inspectCtx.clearRect(0, 0, this.imageWidth, this.imageHeight);
      inspectCtx.drawImage(this.bitmap, 0, 0);
      const inspectData = inspectCtx.getImageData(0, 0, this.imageWidth, this.imageHeight).data;

      let required = 0;
      let deface = 0;
      const paletteMap = new Map();



      for (let y = 0; y < this.imageHeight; y++) {
        for (let x = 0; x < this.imageWidth; x++) {
          const idx = (y * this.imageWidth + x) * 4;
          const r = inspectData[idx];
          const g = inspectData[idx + 1];
          const b = inspectData[idx + 2];
          const a = inspectData[idx + 3];

          if (a === 0) continue; // Ignorar píxeles transparentes
          
          const key = `${r},${g},${b}`;

          // Contar píxeles #deface (marcador de transparencia)
          if (r === 222 && g === 250 && b === 206) {
            deface++;
          }

          // Verificar si es un color exacto primero
          let matchedKey = key;
          let isValidPixel = this.allowedColorsSet.has(key);
          
          // Si no es exacto, usar algoritmo LAB para encontrar el color más cercano
          if (!isValidPixel && this.allowedColors && this.allowedColors.length > 0) {
            const closestColor = ColorUtils.findClosestPaletteColor(r, g, b, this.allowedColors, {
                useLegacyRgb: false, // Usar algoritmo LAB avanzado
                whiteThreshold: 240,
                maxDistance: this.labTolerance
              });
            
            if (closestColor) {
              matchedKey = `${closestColor.r},${closestColor.g},${closestColor.b}`;
              isValidPixel = true;
            }
          }

          // Solo contar colores válidos
          if (!isValidPixel) continue;

          required++;
          paletteMap.set(matchedKey, (paletteMap.get(matchedKey) || 0) + 1);
        }
      }

      this.requiredPixelCount = required;
      this.defacePixelCount = deface;

      // Persistir paleta con todos los colores habilitados por defecto
      const paletteObj = {};
      for (const [key, count] of paletteMap.entries()) {
        paletteObj[key] = { count, enabled: true };
      }
      this.colorPalette = paletteObj;

      log(`[BLUE MARBLE] Análisis: ${required.toLocaleString()} píxeles, ${paletteMap.size} colores`);

      return {
        totalPixels: this.totalPixels,
        requiredPixels: required,
        defacePixels: deface,
        uniqueColors: paletteMap.size,
        colorPalette: paletteObj
      };

    } catch {
      // Fallback si OffscreenCanvas no está disponible
      this.requiredPixelCount = Math.max(0, this.totalPixels);
      this.defacePixelCount = 0;
      // Fallback aplicado
      
      return {
        totalPixels: this.totalPixels,
        requiredPixels: this.totalPixels,
        defacePixels: 0,
        uniqueColors: 0,
        colorPalette: {}
      };
    }
  }

  /**
   * Crea tiles de template (proceso principal de Blue Marble)
   */
  async createTemplateTiles() {
    if (!this.bitmap) {
      throw new Error('Imagen no cargada. Llama a load() primero.');
    }

    // Creando tiles...

    const templateTiles = {};
    const templateTilesBuffers = {};
    
    const canvas = new OffscreenCanvas(this.tileSize, this.tileSize);
    const context = canvas.getContext('2d', { willReadFrequently: true });

    // Para cada tile Y...
    for (let pixelY = this.coords[3]; pixelY < this.imageHeight + this.coords[3]; ) {
      
      // Calcular tamaño de dibujo Y
      const drawSizeY = Math.min(
        this.tileSize - (pixelY % this.tileSize), 
        this.imageHeight - (pixelY - this.coords[3])
      );

      // Para cada tile X...
      for (let pixelX = this.coords[2]; pixelX < this.imageWidth + this.coords[2]; ) {
        
        // Calcular tamaño de dibujo X
        const drawSizeX = Math.min(
          this.tileSize - (pixelX % this.tileSize), 
          this.imageWidth - (pixelX - this.coords[2])
        );

        // Cambiar tamaño del canvas y limpiar
        const canvasWidth = drawSizeX * this.shreadSize;
        const canvasHeight = drawSizeY * this.shreadSize;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.imageSmoothingEnabled = false; // Nearest neighbor

        // Dibujar segmento de template en este segmento de tile
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(
          this.bitmap, // Bitmap de imagen a dibujar
          pixelX - this.coords[2], // Coordenada X desde donde dibujar
          pixelY - this.coords[3], // Coordenada Y desde donde dibujar
          drawSizeX, // Ancho X a dibujar desde
          drawSizeY, // Alto Y a dibujar desde
          0, // Coordenada X donde dibujar
          0, // Coordenada Y donde dibujar
          drawSizeX * this.shreadSize, // Ancho X donde dibujar
          drawSizeY * this.shreadSize // Alto Y donde dibujar
        );

        const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);

        // Procesar píxeles (como Blue Marble)
        for (let y = 0; y < canvasHeight; y++) {
          for (let x = 0; x < canvasWidth; x++) {
            const pixelIndex = (y * canvasWidth + x) * 4;
            
            // Si el píxel es #deface, dibujar patrón de tablero de ajedrez translúcido
            if (
              imageData.data[pixelIndex] === 222 &&
              imageData.data[pixelIndex + 1] === 250 &&
              imageData.data[pixelIndex + 2] === 206
            ) {
              if ((x + y) % 2 === 0) {
                imageData.data[pixelIndex] = 0;
                imageData.data[pixelIndex + 1] = 0;
                imageData.data[pixelIndex + 2] = 0;
              } else {
                imageData.data[pixelIndex] = 255;
                imageData.data[pixelIndex + 1] = 255;
                imageData.data[pixelIndex + 2] = 255;
              }
              imageData.data[pixelIndex + 3] = 32; // Hacerlo translúcido
            } else if (x % this.shreadSize !== 1 || y % this.shreadSize !== 1) {
              // Solo dibujar el píxel central
              imageData.data[pixelIndex + 3] = 0; // Hacer píxel transparente
            } else {
              // Píxel central: mantener solo si está en la paleta permitida del sitio
              const r = imageData.data[pixelIndex];
              const g = imageData.data[pixelIndex + 1];
              const b = imageData.data[pixelIndex + 2];
              if (!this.allowedColorsSet.has(`${r},${g},${b}`)) {
                imageData.data[pixelIndex + 3] = 0; // ocultar colores no-paleta
              }
            }
          }
        }

        context.putImageData(imageData, 0, 0);

        // Crear nombre de tile template "0000,0000,000,000"
        const templateTileName = `${(this.coords[0] + Math.floor(pixelX / 1000))
          .toString()
          .padStart(4, '0')},${(this.coords[1] + Math.floor(pixelY / 1000))
          .toString()
          .padStart(4, '0')},${(pixelX % 1000)
          .toString()
          .padStart(3, '0')},${(pixelY % 1000).toString().padStart(3, '0')}`;

        templateTiles[templateTileName] = await createImageBitmap(canvas);
        
        // Registrar prefijo de tile para búsqueda rápida
        this.tilePrefixes.add(templateTileName.split(',').slice(0, 2).join(','));
        
        // Almacenar buffer para serialización
        const canvasBlob = await canvas.convertToBlob();
        const canvasBuffer = await canvasBlob.arrayBuffer();
        templateTilesBuffers[templateTileName] = canvasBuffer;

        pixelX += drawSizeX;
      }

      pixelY += drawSizeY;
    }

    this.templateTiles = templateTiles;
    this.templateTilesBuffers = templateTilesBuffers;

    log(`[BLUE MARBLE] ${Object.keys(templateTiles).length} tiles creados`);

    return { templateTiles, templateTilesBuffers };
  }

  /**
   * Genera cola de píxeles para pintar (compatible con Auto-Image)
   */
  generatePixelQueue() {
    if (!this.bitmap) {
      throw new Error('Imagen no cargada. Llama a load() primero.');
    }

    // Debug: Verificar estado de la paleta de colores
    log(`[BLUE MARBLE DEBUG] allowedColorsSet size: ${this.allowedColorsSet ? this.allowedColorsSet.size : 'undefined'}`);
    log(`[BLUE MARBLE DEBUG] allowedColors length: ${this.allowedColors ? this.allowedColors.length : 'undefined'}`);
    if (this.allowedColorsSet && this.allowedColorsSet.size > 0) {
      log(`[BLUE MARBLE DEBUG] Primeros colores permitidos: ${Array.from(this.allowedColorsSet).slice(0, 5).join(', ')}`);
    }

    // Generando cola...

    const queue = [];
    const baseX = this.coords[0] * 1000 + (this.coords[2] || 0); // Coordenada global base X
    const baseY = this.coords[1] * 1000 + (this.coords[3] || 0); // Coordenada global base Y

    // Usar canvas 1:1 para leer píxeles exactos
    const readCanvas = new OffscreenCanvas(this.imageWidth, this.imageHeight);
    const readCtx = readCanvas.getContext('2d', { willReadFrequently: true });
    readCtx.imageSmoothingEnabled = false;
    readCtx.drawImage(this.bitmap, 0, 0);
    const pixelData = readCtx.getImageData(0, 0, this.imageWidth, this.imageHeight).data;

    // Debug: Contadores para depuración
    let totalPixelsProcessed = 0;
    let transparentPixels = 0;
    let defacePixels = 0;
    let exactMatches = 0;
    let labMatches = 0;
    let invalidPixels = 0;

    for (let y = 0; y < this.imageHeight; y++) {
        for (let x = 0; x < this.imageWidth; x++) {
          totalPixelsProcessed++;
          const idx = (y * this.imageWidth + x) * 4;
          const r = pixelData[idx];
          const g = pixelData[idx + 1];
          const b = pixelData[idx + 2];
          const alpha = pixelData[idx + 3];

          // Filtrar píxeles transparentes
          if (alpha === 0) {
            transparentPixels++;
            continue;
          }

          // Filtrar píxeles #deface (se renderizan como transparentes)
          if (r === 222 && g === 250 && b === 206) {
            defacePixels++;
            continue;
          }

          const colorKey = `${r},${g},${b}`;
          
          // Verificar si es un color exacto primero
          let finalColorKey = colorKey;
          let finalR = r, finalG = g, finalB = b;
          let isValidPixel = this.allowedColorsSet.has(colorKey);
          
          if (isValidPixel) {
            exactMatches++;
          } else {
            // Si no es exacto, usar algoritmo LAB para encontrar el color más cercano
            if (this.allowedColors && this.allowedColors.length > 0) {
              const closestColor = ColorUtils.findClosestPaletteColor(r, g, b, this.allowedColors, {
                useLegacyRgb: false, // Usar algoritmo LAB avanzado
                whiteThreshold: 240,
                maxDistance: this.labTolerance
              });
              
              if (closestColor) {
                finalR = closestColor.r;
                finalG = closestColor.g;
                finalB = closestColor.b;
                finalColorKey = `${finalR},${finalG},${finalB}`;
                isValidPixel = true;
                labMatches++;
              }
            }
          }
          
          // Solo incluir colores válidos
          if (!isValidPixel) {
            invalidPixels++;
            continue;
          }

        // Calcular coordenadas globales
        const globalX = baseX + x;
        const globalY = baseY + y;

        // Calcular coordenadas de tile
        const tileX = Math.floor(globalX / 1000);
        const tileY = Math.floor(globalY / 1000);
        const localX = globalX % 1000;
        const localY = globalY % 1000;

        // Obtener metadatos del color usando la clave final (con tolerancia aplicada)
        const colorMeta = this.rgbToMeta.get(finalColorKey) || { id: 0, name: 'Unknown' };

        queue.push({
          // Coordenadas de imagen (relativas)
          imageX: x,
          imageY: y,
          // Coordenadas globales
          globalX: globalX,
          globalY: globalY,
          // Coordenadas de tile/local
          tileX: tileX,
          tileY: tileY,
          localX: localX,
          localY: localY,
          // Información de color
          color: {
            r: finalR,
            g: finalG,
            b: finalB,
            id: colorMeta.id,
            name: colorMeta.name
          },
          originalColor: { r: finalR, g: finalG, b: finalB, alpha }
        });
      }
    }

    // Debug: Mostrar estadísticas de procesamiento
    log(`[BLUE MARBLE DEBUG] Estadísticas de procesamiento:`);
    log(`[BLUE MARBLE DEBUG] - Total píxeles procesados: ${totalPixelsProcessed}`);
    log(`[BLUE MARBLE DEBUG] - Píxeles transparentes: ${transparentPixels}`);
    log(`[BLUE MARBLE DEBUG] - Píxeles #deface: ${defacePixels}`);
    log(`[BLUE MARBLE DEBUG] - Coincidencias exactas: ${exactMatches}`);
    log(`[BLUE MARBLE DEBUG] - Coincidencias LAB: ${labMatches}`);
    log(`[BLUE MARBLE DEBUG] - Píxeles inválidos: ${invalidPixels}`);
    log(`[BLUE MARBLE DEBUG] - Cola final: ${queue.length} píxeles`);

    log(`[BLUE MARBLE] Cola: ${queue.length} píxeles`);
    return queue;
  }

  /**
   * Redimensiona la imagen (preserva proporciones por defecto)
   */
  async resize(newWidth, newHeight, keepAspectRatio = true) {
    if (!this.img) {
      throw new Error('Imagen no cargada. Llama a load() primero.');
    }

    const originalWidth = this.img.width;
    const originalHeight = this.img.height;

    if (keepAspectRatio) {
      const aspectRatio = originalWidth / originalHeight;
      if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }
    }

    // Crear nueva imagen redimensionada
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = false; // Pixel art
    tempCtx.drawImage(this.img, 0, 0, newWidth, newHeight);

    // Actualizar imagen y bitmap
    const newDataUrl = tempCanvas.toDataURL();
    this.img.src = newDataUrl;
    this.imageSrc = newDataUrl;

    await new Promise(resolve => {
      this.img.onload = async () => {
        this.bitmap = await createImageBitmap(this.img);
        this.imageWidth = this.bitmap.width;
        this.imageHeight = this.bitmap.height;
        this.totalPixels = this.imageWidth * this.imageHeight;
        resolve();
      };
    });

    log(`[BLUE MARBLE] Imagen redimensionada: ${originalWidth}×${originalHeight} → ${this.imageWidth}×${this.imageHeight}`);
    
    return {
      width: this.imageWidth,
      height: this.imageHeight
    };
  }

  /**
   * Obtiene información completa de la imagen procesada
   */
  getImageData() {
    return {
      width: this.imageWidth,
      height: this.imageHeight,
      totalPixels: this.totalPixels,
      requiredPixels: this.requiredPixelCount,
      defacePixels: this.defacePixelCount,
      colorPalette: this.colorPalette,
      coords: [...this.coords],
      originalName: this.originalName || 'image.png',
      // Para compatibilidad con Auto-Image actual
      pixels: this.generatePixelQueue()
    };
  }

  /**
   * Genera preview de la imagen
   */
  generatePreview(maxWidth = 200, maxHeight = 200) {
    if (!this.img) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const { width: origWidth, height: origHeight } = this.img;
    const aspectRatio = origWidth / origHeight;

    let newWidth, newHeight;
    if (maxWidth / maxHeight > aspectRatio) {
      newHeight = maxHeight;
      newWidth = maxHeight * aspectRatio;
    } else {
      newWidth = maxWidth;
      newHeight = maxWidth / aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.img, 0, 0, newWidth, newHeight);

    return canvas.toDataURL();
  }

  getDimensions() {
    return {
      width: this.imageWidth,
      height: this.imageHeight
    };
  }
  
  /**
   * Establecer colores seleccionados por el usuario
   */
  setSelectedColors(selectedColors) {
    // Normalizar selección
    this.selectedColors = Array.isArray(selectedColors) ? selectedColors : [];

    if (this.selectedColors.length > 0) {
      // allowedColorsSet debe usar claves RGB exactas "r,g,b"
      this.allowedColorsSet = new Set(
        this.selectedColors.map(c => {
          const r = c.r ?? c.rgb?.r; const g = c.g ?? c.rgb?.g; const b = c.b ?? c.rgb?.b;
          return `${r},${g},${b}`;
        })
      );

      // Lista de colores permitidos para matching LAB
      this.allowedColors = this.selectedColors.map(c => ({
        id: c.id,
        name: c.name,
        premium: !!c.premium,
        r: c.r ?? c.rgb?.r,
        g: c.g ?? c.rgb?.g,
        b: c.b ?? c.rgb?.b,
        rgb: c.rgb || { r: c.r, g: c.g, b: c.b }
      }));

      // Actualizar mapa de paleta
      this.colorPalette = {};
      this.selectedColors.forEach(color => {
        const rgb = color.rgb || { r: color.r, g: color.g, b: color.b };
        this.colorPalette[color.id] = rgb;
      });

      log(`🎨 [BLUE MARBLE] Paleta actualizada con ${this.selectedColors.length} colores seleccionados`);

      // Limpiar caché de imageData para forzar recálculo con nueva paleta
      this.imageDataCache = null;
    } else {
      // Sin selección explícita: no limitar por paleta en preview/cola
      this.allowedColors = [...this.allSiteColors];
      this.allowedColorsSet = new Set(this.allSiteColors.map(c => `${c.r},${c.g},${c.b}`));
      log(`🎨 [BLUE MARBLE] Sin selección: usando todos los colores disponibles (${this.allowedColors.length})`);
    }
  }

  /**
   * Genera una preview aplicando la paleta seleccionada con matching LAB.
   * Devuelve también estadísticas de mapeo.
   */
  generatePreviewWithPalette(maxWidth = 200, maxHeight = 200) {
  if (!this.img) return { dataUrl: null, stats: { total: 0, exact: 0, lab: 0, removed: 0 } };

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  // Usar siempre la fuente original para la previsualización con paleta,
  // así la tolerancia LAB afecta correctamente aunque la imagen base esté remapeada
  const source = this.originalBitmap || this.bitmap || this.img;
  const { width: origWidth, height: origHeight } = source;
    const aspectRatio = origWidth / origHeight;

    let newWidth, newHeight;
    if (maxWidth / maxHeight > aspectRatio) {
      newHeight = Math.max(1, Math.round(maxHeight));
      newWidth = Math.max(1, Math.round(maxHeight * aspectRatio));
    } else {
      newWidth = Math.max(1, Math.round(maxWidth));
      newHeight = Math.max(1, Math.round(maxWidth / aspectRatio));
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(source, 0, 0, newWidth, newHeight);

  const imgData = ctx.getImageData(0, 0, newWidth, newHeight);
  const data = imgData.data;

  const palette = Array.isArray(this.allowedColors) ? this.allowedColors : [];

  let exact = 0; let lab = 0; let removed = 0; const total = newWidth * newHeight;

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        const idx = (y * newWidth + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a === 0) continue;


  // Exact match contra paleta activa
  const key = `${r},${g},${b}`;
  let matched = this.allowedColorsSet && this.allowedColorsSet.has(key);
  if (matched) { exact++; }

        if (!matched) {
          // LAB match al más cercano en la paleta activa
          const closest = ColorUtils.findClosestPaletteColor(r, g, b, palette, { useLegacyRgb: false, whiteThreshold: 240, maxDistance: this.labTolerance });
          if (closest) {
            const cr = closest.r ?? closest.rgb?.r; const cg = closest.g ?? closest.rgb?.g; const cb = closest.b ?? closest.rgb?.b;
            data[idx] = cr; data[idx + 1] = cg; data[idx + 2] = cb; data[idx + 3] = 255; lab++;
          } else {
            // No hay opción en selección, remover
            data[idx + 3] = 0; removed++;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return { dataUrl: canvas.toDataURL(), stats: { total, exact, lab, removed } };
  }

  /**
   * Remapea y sustituye la imagen base a la paleta activa (pixelart). Se usa justo tras cargar.
   */
  async remapImageToPalette() {
    if (!this.bitmap) return;
    // Asegurarse de tener paleta: si no hay selección, usar todos los colores del sitio
    if (!this.allowedColors || this.allowedColors.length === 0) {
      this.allowedColors = [...this.allSiteColors];
      this.allowedColorsSet = new Set(this.allSiteColors.map(c => `${c.r},${c.g},${c.b}`));
    }
    const w = this.imageWidth, h = this.imageHeight;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.bitmap, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const palette = this.allowedColors;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
        if (a === 0) continue;
        const key = `${r},${g},${b}`;
        if (this.allowedColorsSet && this.allowedColorsSet.has(key)) continue;
        const closest = ColorUtils.findClosestPaletteColor(r, g, b, palette, { useLegacyRgb: false, whiteThreshold: 240, maxDistance: this.labTolerance });
        if (closest) {
          const cr = closest.r ?? closest.rgb?.r; const cg = closest.g ?? closest.rgb?.g; const cb = closest.b ?? closest.rgb?.b;
          data[idx] = cr; data[idx + 1] = cg; data[idx + 2] = cb; data[idx + 3] = 255;
        } else {
          data[idx + 3] = 0;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    // Reemplazar bitmap e img con pixelart remapeado
    const blob = await new Promise(res => canvas.toBlob(res));
  const url = window.URL.createObjectURL(blob);
    this.img.src = url; this.imageSrc = url;
    await new Promise(resolve => { this.img.onload = async () => { this.bitmap = await createImageBitmap(this.img); resolve(); }; });
    log('[BLUE MARBLE] Imagen base remapeada a paleta activa (pixelart)');
  }
}

// Mantener exports de funciones para compatibilidad
import { detectAvailableColors } from "./processor.js";
export { detectAvailableColors };

export function findClosestColor(rgb, palette, options = {}) {
  // Usar las nuevas utilidades de color avanzadas
  return ColorUtils.findClosestColor(rgb, palette, {
    useLegacyRgb: false, // Usar algoritmo LAB por defecto
    whiteThreshold: 240,
    ...options
  });
}

export function generatePixelQueue(imageData, startPosition, tileX, tileY) {
  // Esta función ahora es manejada por BlueMarblelImageProcessor.generatePixelQueue()
  // Mantenida para compatibilidad
  const { pixels } = imageData;
  const { x: localStartX, y: localStartY } = startPosition;
  const queue = [];

  for (const pixelData of pixels) {
    if (!pixelData) continue;
    
    const globalX = localStartX + pixelData.imageX;
    const globalY = localStartY + pixelData.imageY;
    
    queue.push({
      imageX: pixelData.imageX,
      imageY: pixelData.imageY,
      localX: globalX,
      localY: globalY,
      tileX: tileX,
      tileY: tileY,
      color: pixelData.color,
      originalColor: pixelData.originalColor
    });
  }

  log(`Cola de píxeles generada (compatibilidad): ${queue.length} píxeles`);
  return queue;
}
