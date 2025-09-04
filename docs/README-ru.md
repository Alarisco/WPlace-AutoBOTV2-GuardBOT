(markdown)
# WPlace AutoBOT

<!-- Выбор языка -->
<p align="center">
	<strong>🌍 Доступные языки / Available languages / Idiomas disponibles / Langues disponibles:</strong><br>
	<a href="../README.md">🇪🇸 Español</a> |
	<a href="README-en.md">🇺🇸 English</a> |
	---

	<!-- Кнопка поддержки: Buy Me a Coffee (по центру) -->
	<a href="https://www.buymeacoffee.com/alariscoi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=alariscoi&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>


	## ⚠️ Важное уведомление

	Ваш предыдущий букмарклет может перестать работать. Необходимо добавить букмарклет снова, используя новый формат инъекции (Blob + injection). Создайте закладку в вашем браузере и вставьте один из этих кодов в зависимости от того, какой бот вам нужен.

	### 🧭 Launcher (рекомендуется)
	Один букмарклет, позволяющий выбирать между Auto-Farm, Auto-Image или Auto-Guard.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Launcher] Не удалось загрузить/вставить: "+e.message+"\nПопробуйте на другой странице или используйте опцию C (модуль).");}})();
	```

	### 🛡️ Auto-Guard
	Защитите области вашего пиксель-арта и автоматически исправляйте нежелательные изменения.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Guard.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Guard] Не удалось загрузить/вставить: "+e.message+"\nПопробуйте на другой странице или используйте опцию C (модуль).");}})();
	```

	### 🌾 Auto-Farm
	Автоматически фармите опыт, соблюдая лимиты сервера.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Farm.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Farm] Не удалось загрузить/вставить: "+e.message+"\nПопробуйте на другой странице или используйте опцию C (модуль).");}})();
	```

	### 🎨 Auto-Image
	Автоматически рисуйте изображение в виде пиксель-арта на холсте.

	```javascript
	javascript:(async()=>{const U="https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Image.js";try{const r=await fetch(U,{cache:"no-cache"});if(!r.ok)throw new Error(r.status+" "+r.statusText);const code=await r.text();const blob=new Blob([code+"\n//# sourceURL="+U],{type:"text/javascript"});const blobUrl=URL.createObjectURL(blob);try{await new Promise((ok,err)=>{const s=document.createElement("script");s.src=blobUrl;s.onload=ok;s.onerror=err;document.documentElement.appendChild(s);});}catch(e){await import(blobUrl);}}catch(e){alert("[Auto-Image] Не удалось загрузить/вставить: "+e.message+"\nПопробуйте на другой странице или используйте опцию C (модуль).");}})();
	```
 - **📖 Документация:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

---

## 🧩 Расширение для браузера

Доступен сайт и расширение для запуска бота:

- Сайт: https://subnormail.com/autobot

<p align="center">
	<a href="https://subnormail.com/autobot" target="_blank" rel="noopener">
		<img alt="Доступно в Chrome Web Store" height="58" src="https://developer.chrome.com/static/docs/webstore/branding/image/ChromeWebStore_BadgeWBorder_v2_206x58.png" />
	</a>
	<br/>
	<em>Установите его или запустите бот с сайта</em>
</p>

### Ручная установка

- Скачайте и распакуйте ZIP в постоянную папку
- Перейдите на chrome://extensions/ и включите "Режим разработчика" (Developer mode)
- Нажмите "Load unpacked"/"Загрузить распакованную" и выберите распакованную папку

### 🔄 Обновления

Боты обновляются автоматически при выполнении bookmarklet. Вы всегда получаете последнюю версию.

---

## 🤝 Как внести вклад

Хотите помочь? Отлично!

👉 **[Смотрите полный гайд по контрибьюции](CONTRIBUTING.md)**

Включает:
- 🏗️ Структуру проекта и архитектуру
- 🔧 Скрипты разработки и сборки
- 📝 Правила кода и коммитов
- 🚀 Процесс разработки

---

## Благодарности

Расширение для браузера создано <strong>Yerepa</strong>. Спасибо за вклад!

<p align="center">
	<strong>🎨 Сделано с ❤️ для сообщества WPlace</strong><br>
	<em>Используйте ответственно и наслаждайтесь созданием пиксель-арта</em>
</p>

(конец файла)

