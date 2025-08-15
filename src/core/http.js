export async function fetchWithTimeout(url, { timeout = 10000, ...opts } = {}) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort("timeout"), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal, ...opts });
    return res;
  } finally {
    clearTimeout(id);
  }
}
