let loaded = false;

export async function loadTurnstile(siteKey) {
  if (loaded) return;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true; s.defer = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error("Turnstile load failed"));
    document.head.appendChild(s);
  });
  loaded = true;
}

export function executeTurnstile(siteKey, action = "paint") {
  return new Promise((resolve, reject) => {
    if (!window.turnstile) return reject(new Error("Turnstile no disponible"));
    window.turnstile.render(document.createElement("div"), {
      sitekey: siteKey, action,
      callback: (token) => resolve(token),
      "error-callback": () => reject(new Error("Turnstile error"))
    });
  });
}
