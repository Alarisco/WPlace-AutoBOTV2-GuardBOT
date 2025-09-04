# WPlace AutoBOT

<!-- Selector de idiomas -->
<p align="center">
  <strong>🌍 Idiomas disponibles / Available Languages / Langues disponibles / Доступные языки:</strong><br>
  <a href="README.md">🇪🇸 Español</a> |
  <a href="docs/README-en.md">🇺🇸 English</a> |
  ---

  <!-- Botón de apoyo: Buy Me a Coffee (centrado) -->
  <a href="https://www.buymeacoffee.com/alariscoi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=alariscoi&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
  
  
  ## ⚠️ Aviso importante

  Tu marcador anterior puede no funcionar. Es necesario volver a agregar el marcador con el nuevo formato de carga (Blob + inyección). Crea un marcador en tu navegador y pega uno de estos códigos según el bot que quieras usar.

  ### 🧭 Launcher (recomendado)
  Un único marcador para elegir entre Auto-Farm, Auto-Image o Auto-Guard.

  ```javascript
  javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
  ```

  ### 🛡️ Auto-Guard
  Protege áreas de tu pixel art y repara cambios no deseados automáticamente.

  ```javascript
  javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
  ```

  ### 🌾 Auto-Farm
  Farmea experiencia automáticamente respetando los límites del servidor.

  ```javascript
  javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
  ```

  ### 🎨 Auto-Image
  Pinta una imagen automáticamente como pixel art en el canvas.

  ```javascript
  javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] No se pudo cargar/inyectar: "+e.message+"\nPrueba en otra página o usa la Opción C (módulo).");}})();
  ```
 - **📖 Documentación:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

---

## 🧩 Extensión del navegador

Se ha creado una web con una extensión disponible para iniciar el bot:

- Sitio: https://subnormail.com/autobot

<p align="center">
  <a href="https://subnormail.com/autobot" target="_blank" rel="noopener">
    <img alt="Disponible en Chrome Web Store" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/ChromeWebStore_BadgeWBorder_v2_206x58.png" />
  </a>
  <br/>
  <em>Instálala o inicia el bot desde la web</em>
</p>

### Instalación Manual

- Descarga y descomprime el archivo ZIP en una carpeta permanente
- Ve a chrome://extensions/ y activa "Developer mode"/"Modo desarrollador"
- Click en "Load unpacked"/"Cargar descomprimida" y selecciona la carpeta descomprimida

### 🔄 Actualizaciones

Los bots se actualizan automáticamente al ejecutar el bookmarklet. Siempre obtienes la versión más reciente.

---

## 🤝 Contribuir

¿Quieres contribuir al proyecto? ¡Genial! 

👉 **[Consulta la guía completa de contribución](docs/CONTRIBUTING.md)**

Incluye:
- 🏗️ Estructura del proyecto y arquitectura
- 🔧 Scripts de desarrollo y build
- 📝 Estándares de código y commits
- 🚀 Flujo de desarrollo paso a paso

---

## Créditos

Extensión del navegador creada por <strong>Yerepa</strong>. ¡Gracias por la contribución!


<p align="center">
  <strong>🎨 Hecho con ❤️ para la comunidad de WPlace</strong><br>
  <em>Usa responsablemente y disfruta creando arte píxel a píxel</em>
</p>
