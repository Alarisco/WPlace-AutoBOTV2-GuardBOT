export function groupByTile(pixels) {
  const size = 3000;
  const map = new Map();
  for (const p of pixels) {
    const tileX = Math.floor(p.absX / size);
    const tileY = Math.floor(p.absY / size);
    const key = `${tileX},${tileY}`;
    if (!map.has(key)) map.set(key, { tileX, tileY, pixels: [] });
    map.get(key).pixels.push({ 
      x: p.absX - tileX*size, 
      y: p.absY - tileY*size, 
      color: p.color 
    });
  }
  return [...map.values()];
}
