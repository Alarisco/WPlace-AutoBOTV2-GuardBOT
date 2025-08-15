export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function retry(fn, { tries = 3, base = 500 } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); }
    catch (e) { last = e; await sleep(base * 2 ** i); }
  }
  throw last;
}

export const randInt = (n) => Math.floor(Math.random() * n);

// Sleep with countdown (from farm)
export async function sleepWithCountdown(ms, onUpdate, state) {
  const startTime = Date.now();
  const endTime = startTime + ms;
  
  while (Date.now() < endTime && (!state || state.running)) {
    const remaining = endTime - Date.now();
    
    if (onUpdate) {
      onUpdate(remaining);
    }
    
    await sleep(Math.min(1000, remaining));
  }
}
