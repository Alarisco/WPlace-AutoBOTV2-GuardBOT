export async function fetchWithTimeout(url, { timeout = 10000, ...opts } = {}) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort("timeout"), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal, ...opts });
    return res;
  } catch (error) {
    // Manejo mejorado de errores de timeout para evitar uncaught promises
    if (error.name === 'AbortError' || error.message === 'timeout') {
      const timeoutError = new Error(`Request timeout after ${timeout}ms`);
      timeoutError.name = 'TimeoutError';
      timeoutError.timeout = timeout;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}
