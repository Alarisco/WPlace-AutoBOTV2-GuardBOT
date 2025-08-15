export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function retry(fn, { tries = 3, base = 500 } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); }
    catch (e) { last = e; await sleep(base * 2 ** i); }
  }
  throw last;
}
