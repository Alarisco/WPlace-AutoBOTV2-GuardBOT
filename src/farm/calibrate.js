export function enableCalibrationOnce(onTile) {
  const original = window.fetch;
  let done = false;
  window.fetch = async (...args) => {
    try {
      const res = await original(...args);
      if (!done) {
        const url = typeof args[0] === "string" ? args[0] : args[0]?.url;
        const m = /\/s0\/pixel\/(\d+)\/(\d+)/.exec(url || "");
        if (m) { 
          done = true; 
          onTile?.({ tileX: +m[1], tileY: +m[2] }); 
          window.fetch = original; 
        }
      }
      return res;
    } catch (e) { 
      window.fetch = original; 
      throw e; 
    }
  };
}
