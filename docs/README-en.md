(markdown)
# WPlace AutoBOT

<!-- Language selector -->
<p align="center">
	<strong>🌍 Available languages / Idiomas disponibles / Langues disponibles / Доступные языки:</strong><br>
	<a href="../README.md">🇪🇸 Español</a> |
	<a href="README-en.md">🇺🇸 English</a> |
	---

	<!-- Support button: Buy Me a Coffee (centered) -->
	<a href="https://www.buymeacoffee.com/alariscoi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=alariscoi&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>


	## ⚠️ Important notice

	Your previous bookmarklet may stop working. You need to add the bookmarklet again using the new injection format (Blob + injection). Create a bookmark in your browser and paste one of these codes depending on the bot you want to use.

	### 🧭 Launcher (recommended)
	A single bookmarklet to choose between Auto-Farm, Auto-Image or Auto-Guard.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] Could not load/inject: "+e.message+"\nTry another page or use Option C (module).");}})();
	```

	### 🛡️ Auto-Guard
	Protect areas of your pixel art and automatically repair undesired changes.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] Could not load/inject: "+e.message+"\nTry another page or use Option C (module).");}})();
	```

	### 🌾 Auto-Farm
	Farm experience automatically while respecting server limits.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] Could not load/inject: "+e.message+"\nTry another page or use Option C (module).");}})();
	```

	### 🎨 Auto-Image
	Paint an image automatically as pixel art on the canvas.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] Could not load/inject: "+e.message+"\nTry another page or use Option C (module).");}})();
	```
 - **📖 Documentation:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

---

## 🧩 Browser extension

A website and a browser extension are available to start the bot:

- Site: https://subnormail.com/autobot

<p align="center">
	<a href="https://subnormail.com/autobot" target="_blank" rel="noopener">
		<img alt="Available on Chrome Web Store" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/ChromeWebStore_BadgeWBorder_v2_206x58.png" />
	</a>
	<br/>
	<em>Install it or launch the bot from the website</em>
</p>

### Manual installation

- Download and unzip the ZIP file into a permanent folder
- Go to chrome://extensions/ and enable "Developer mode"
- Click on "Load unpacked" and select the unzipped folder

### 🔄 Updates

Bots update automatically when the bookmarklet is executed. You always get the latest version.

---

## 🤝 Contributing

Want to contribute? Great!

👉 **[See the full contribution guide](CONTRIBUTING.md)**

Includes:
- 🏗️ Project structure and architecture
- 🔧 Development and build scripts
- 📝 Coding and commit standards
- 🚀 Development workflow

---

## Credits

Browser extension created by **Yerepa**. Thanks for the contribution!

<p align="center">
	<strong>🎨 Made with ❤️ for the WPlace community</strong><br>
	<em>Use responsibly and enjoy creating pixel art</em>
</p>

(end of file)

