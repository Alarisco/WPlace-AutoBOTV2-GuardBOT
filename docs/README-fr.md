(markdown)
# WPlace AutoBOT

<!-- Sélecteur de langue -->
<p align="center">
	<strong>🌍 Langues disponibles / Available languages / Idiomas disponibles / Доступные языки:</strong><br>
	<a href="../README.md">🇪🇸 Español</a> |
	<a href="README-en.md">🇺🇸 English</a> |
	---

	<!-- Bouton de soutien: Buy Me a Coffee (centré) -->
	<a href="https://www.buymeacoffee.com/alariscoi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=alariscoi&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>


	## ⚠️ Avis important

	Votre ancien bookmarklet peut ne plus fonctionner. Vous devez ajouter à nouveau le bookmarklet en utilisant le nouveau format d'injection (Blob + injection). Créez un favori (bookmark) dans votre navigateur et collez l'un de ces codes selon le bot que vous souhaitez utiliser.

	### 🧭 Launcher (recommandé)
	Un seul bookmarklet pour choisir entre Auto-Farm, Auto-Image ou Auto-Guard.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] Impossible de charger/injecter : "+e.message+"\nEssayez une autre page ou utilisez l'option C (module).");}})();
	```

	### 🛡️ Auto-Guard
	Protégez des zones de votre pixel art et réparez automatiquement les modifications indésirables.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] Impossible de charger/injecter : "+e.message+"\nEssayez une autre page ou utilisez l'option C (module).");}})();
	```

	### 🌾 Auto-Farm
	Récoltez de l'expérience automatiquement tout en respectant les limites du serveur.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] Impossible de charger/injecter : "+e.message+"\nEssayez une autre page ou utilisez l'option C (module).");}})();
	```

	### 🎨 Auto-Image
	Peignez une image automatiquement en pixel art sur le canvas.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] Impossible de charger/injecter : "+e.message+"\nEssayez une autre page ou utilisez l'option C (module).");}})();
	```
 - **📖 Documentation:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

---

## 🧩 Extension du navigateur

Un site et une extension sont disponibles pour lancer le bot :

- Site : https://subnormail.com/autobot

<p align="center">
	<a href="https://subnormail.com/autobot" target="_blank" rel="noopener">
		<img alt="Disponible sur Chrome Web Store" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/ChromeWebStore_BadgeWBorder_v2_206x58.png" />
	</a>
	<br/>
	<em>Installez-la ou lancez le bot depuis le site</em>
</p>

### Installation manuelle

- Téléchargez et décompressez le fichier ZIP dans un dossier permanent
- Allez à chrome://extensions/ et activez le "Mode développeur"
- Cliquez sur "Charger l'extension non empaquetée" / "Load unpacked" et sélectionnez le dossier décompressé

### 🔄 Mises à jour

Les bots se mettent à jour automatiquement lorsque vous exécutez le bookmarklet. Vous obtenez toujours la dernière version.

---

## 🤝 Contribuer

Vous voulez contribuer ? Super !

👉 **[Consultez le guide de contribution complet](CONTRIBUTING.md)**

Comprend :
- 🏗️ Structure du projet et architecture
- 🔧 Scripts de développement et build
- 📝 Normes de code et commits
- 🚀 Flux de développement

---

## Crédits

Extension du navigateur créée par **Yerepa**. Merci pour la contribution !

<p align="center">
	<strong>🎨 Fait avec ❤️ pour la communauté WPlace</strong><br>
	<em>Utilisez-le de manière responsable et amusez-vous à créer du pixel art</em>
</p>

(fin du fichier)

