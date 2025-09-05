> ⚠️ **Important notice (EN)**  
> Do **NOT** use the launcher or the Chrome extension.  
> Always run the bot directly from the specific bookmarklet you want to use.

# WPlace AutoBOT

<!-- Language selector -->
<p align="center">
	<strong>🌍 Available languages / Idiomas disponibles / Langues disponibles / Доступные языки:</strong><br>
	<a href="../README.md">🇪🇸 Español</a> |
	<a href="README-en.md">🇺🇸 English</a>
</p>

---

<!-- Support button: Buy Me a Coffee (centered) -->
<p align="center">
	<a href="https://www.buymeacoffee.com/alariscoi" target="_blank">
		<img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-yellow?style=for-the-badge&logo=buymeacoffee" alt="Buy Me a Coffee">
	</a>
</p>

## ⚠️ Important notice

Your previous bookmarklet may stop working. You need to add the bookmarklet again using the new injection format (Blob + injection). Create a bookmark in your browser and paste one of these codes depending on the bot you want to use.

### 🧭 Launcher (recommended)
A single bookmarklet to choose between Auto-Farm, Auto-Image or Auto-Guard.

```javascript
javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] Could not load/inject: "+e.message+"\nTry another page or use Option C (module).");}})();
