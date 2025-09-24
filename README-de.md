<p align="center">
  <a href="https://chromewebstore.google.com/detail/kjbodcmljdmjmcjdhoghcclejpmgfeoj?utm_source=item-share-cb" target="_blank" rel="noopener">
    <img src="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/src/addons/Auto-bot-extension/icons/icon128.png" alt="WPlace AutoBOT" width="160" height="160"/>
  </a>
</p>

<h1 align="center">WPLACE-AUTOBOT</h1>

<!-- Buy Me a Coffee Button -->
<p align="center">
  <a href="https://buymeacoffee.com/alariscoi" target="_blank" rel="noopener">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" />
  </a>
</p>

<!-- Chrome und Firefox Badges -->
<p align="center">
  <a href="https://chromewebstore.google.com/detail/kjbodcmljdmjmcjdhoghcclejpmgfeoj?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer">
    <img
      src="https://developer.chrome.com/static/docs/webstore/branding/image/mPGKYBIR2uCP0ApchDXE.png"
      alt="Verfügbar im Chrome Web Store"
      height="70"
    />
  </a>
  &nbsp;&nbsp;
  <a href="https://addons.mozilla.org/es-ES/firefox/addon/wplace-autobot-launcher/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://logos-world.net/wp-content/uploads/2021/08/Firefox-Logo.png"
      alt="Firefox Add-on"
      height="70"
    />
  </a>
</p>

<!-- Hinweis: Link zum WPlace Master Server Repository -->
<p align="center">
  🚀 Neues Tool: <br>
  <a href="https://github.com/Alarisco/Wplace-AutoBotnet-Server" target="_blank" rel="noopener">
    WPlace Master Server
  </a> – zentraler Server zur Koordination von Bots mit Web-Oberfläche.
</p>

<!-- Hinweistext zentriert -->
<p align="center">
  <em>Beste Erfahrung: Installiere die Browser-Erweiterung.</em>
</p>

---

## 🚀 Schnellstart (Empfohlen: Erweiterung)

Installiere die offizielle Chrome-Erweiterung und starte den Bot mit einem Klick:

1. Öffne den Chrome Web Store:
   https://chromewebstore.google.com/detail/kjbodcmljdmjmcjdhoghcclejpmgfeoj?utm_source=item-share-cb
2. Klicke auf "Zu Chrome hinzufügen"
3. Pinne die Erweiterung (optional) und öffne WPlace
4. Klicke auf das Symbol → wähle den Modus (Launcher, Guard, Image, Farm)

> Die Erweiterung lädt immer automatisch die neueste Bot-Version.

---

## 📦 Alternative: Bookmarklet-Injektion
Wenn du die Erweiterung nicht installieren möchtest, kannst du stattdessen ein Bookmarklet verwenden.
Erstelle ein neues Lesezeichen und füge einen der folgenden Codeschnipsel als URL ein.

### Launcher (Modus nach dem Laden auswählen)
```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] Konnte nicht laden/injizieren: "+e.message+"\nProbiere eine andere Seite oder Option C (Modul).");}})();
```

### Guard (schützen & automatisch reparieren)
```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] Konnte nicht laden/injizieren: "+e.message+"\nProbiere eine andere Seite oder Option C (Modul).");}})();
```

### Image (Pixel-Art automatisch malen)
```javascript
javascript:(async(()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] Konnte nicht laden/injizieren: "+e.message+"\nProbiere eine andere Seite oder Option C (Modul).");}})();
```

### Farm (XP farmen)
```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] Konnte nicht laden/injizieren: "+e.message+"\nProbiere eine andere Seite oder Option C (Modul).");}})();
```

---

## 🔄 Updates
Sowohl die Erweiterung als auch die Bookmarklets laden immer die neueste Version. Einfach erneut starten.

---

## 🤝 Mitwirken
Pull Requests sind willkommen. Siehe CONTRIBUTING.md für Architektur, Workflow und Standards.

---

<p align="center"><strong>Mit ❤️ für die WPlace-Community entwickelt – bitte verantwortungsvoll nutzen.</strong></p>
