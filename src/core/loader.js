export async function loadAndEvalUrlWithFallback(url) {
  try {
    const txt = await fetch(url, { cache: "no-store" }).then(r => r.text());
    // eval "indirecto" para no heredar scope
    (0, eval)(txt);
  } catch {
    const s = document.createElement("script");
    s.src = url; s.async = true;
    document.head.appendChild(s);
  }
}
