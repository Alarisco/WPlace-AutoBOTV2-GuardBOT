export class ImageProcessor {
  constructor() { 
    this.canvas = document.createElement("canvas"); 
    this.ctx = this.canvas.getContext("2d"); 
  }
  
  load(img, maxW, maxH) { 
    // redimensiona/prepara; devuelve datos 
    this.canvas.width = Math.min(img.width, maxW);
    this.canvas.height = Math.min(img.height, maxH);
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
  
  getPixelAt(x, y) { 
    const imageData = this.ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}
