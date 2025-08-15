export const $ = (sel, root = document) => root.querySelector(sel);

export function createStyle(css) {
  const s = document.createElement("style");
  s.textContent = css; document.head.appendChild(s); return s;
}

export function mountShadow(container = document.body) {
  const host = document.createElement("div");
  host.id = "wplace-bot-root";
  container.appendChild(host);
  const root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  return { host, root };
}
