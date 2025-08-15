# WPlace AutoBOT

<!-- Language selector -->
<p align="center">
  <strong>🌍 Available Languages / Idiomas disponibles / Langues disponibles:</strong><br>
  <a href="../README.md">🇪🇸 Español</a> |
  <a href="README-en.md">🇺🇸 English</a> |
  <a href="README-fr.md">🇫🇷 Français</a>
</p>

<!-- Centered badges -->
<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=Alarisco.WPlace-AutoBOTV2&left_color=black&right_color=blue&style=for-the-badge" alt="Visits" />
  
  <img src="https://img.shields.io/github/stars/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Forks" />
  <img src="https://img.shields.io/github/issues/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="GitHub Issues" />
  <img src="https://img.shields.io/github/last-commit/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="Last commit" />
  <img src="https://img.shields.io/badge/Licence-MIT-green?style=for-the-badge"
       alt="Licence" />
</p>

## 🤖 WPlace AutoBOT

<p align="center">
  <img src="https://img.shields.io/badge/WPlace-AutoBOT-blue?style=for-the-badge" alt="WPlace AutoBOT">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge" alt="JavaScript">
</p>

<p align="center">
  <strong>Automated scripts for <a href="https://wplace.live" target="_blank">WPlace</a></strong><br>
  Automatic experience farming and advanced pixel art creation
</p>

---

## 📋 Table of Contents

- [🌍 Multi-language Support](#-multi-language-support)
- [🚀 Quick Start](#-quick-start)
- [🔧 Available Bots](#-available-bots)
- [🌾 Auto-Farm Bot](#-auto-farm-bot)
- [🎨 Auto-Image Bot](#-auto-image-bot)
- [📖 Detailed Guides](#-detailed-guides)
- [⚠️ Important](#️-important)
- [🆘 Support](#-support)

---

## 🌍 Multi-language Support

**WPlace AutoBOT now speaks your language!** 🗣️

### 🎯 Available Languages
- **🇪🇸 Español** - Full Spanish support
- **🇺🇸 English** - Default for English browsers
- **🇫🇷 Français** - Complete French support

### ✨ i18n System Features
- **🔄 Auto-detection**: Detects your browser language
- **🎛️ Manual selector**: Change language anytime
- **💾 Persistent memory**: Remembers your preference
- **🔗 Synchronization**: All bots use the same language
- **📱 Complete interface**: 100% translated

### 📖 Documentation by Language
- **[🇪🇸 Spanish Documentation](../README.md)**
- **[🇺🇸 English Documentation](README-en.md)** (this file)
- **[🇫🇷 French Documentation](README-fr.md)**

### 🎮 How to Change Language
1. Run any bot (Launcher recommended)
2. Look for the language selector in the top-left corner 🌐
3. Click and select your preferred language
4. The entire interface updates automatically! ✨

---

## 🚀 Quick Start

### Universal Installation

1. **Copy the desired bot code**
2. **Create a bookmark in your browser:**
   - Right-click on the bookmark bar → "Add page"
   - Name: `WPlace Bot`
   - URL: Paste the JavaScript code
3. **Use it on WPlace:**
   - Go to [wplace.live](https://wplace.live)
   - Log in
   - Click your bookmark

---

## 🔧 Available Bots

### 🧭 Launcher (recommended)
A single bookmark that lets you choose between Auto-Farm or Auto-Image on each run.

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js").then(r=>r.text()).then(eval)
```

— Or use the bots separately —

### 🌾 Auto-Farm Bot
**Automatic experience and charges farming**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Farm.js").then(t=>t.text()).then(eval);
```

**Features:**
- ✅ 24/7 automatic farming
- ✅ Built-in anti-ban system
- ✅ Automatic calibration
- ✅ Smart charge management
- ✅ Advanced configuration

### 🎨 Auto-Image Bot
**Automatic pixel art creation from images**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Image.js").then(t=>t.text()).then(eval);
```

**Features:**
- ✅ Converts images to pixel art
- ✅ Smart resizing
- ✅ Precise position selection
- ✅ Optimized batch painting
- ✅ Automatic cooldown system
- ✅ **💾 Save/Load progress**
- ✅ **⏸️ Pause and resume jobs**
- ✅ 100% translated interface

---

## 📖 Detailed Guides

## 🌾 Auto-Farm Bot - Complete Manual

### ⚙️ Configuration

| Parameter | Range | Recommended | Description |
|-----------|-------|-------------|-------------|
| **Delay (sec)** | 5-300 | 15-30 | Time between pixel batches |
| **Min. Charges** | 1-50 | 10-20 | Minimum charges before painting |
| **Pixels/Batch** | 1-50 | 10-30 | Simultaneous pixels per batch |
| **Color Mode** | Random/Fixed | Random | Color selection |

### 🎮 Controls

- **🟢 Start:** Start continuous automatic farming
- **🔵 Once:** Paint a single batch (useful for testing)
- **🔴 Stop:** Stop the bot completely

### 📊 Status Panel

**User Information:**
- User, Charges, Painted, Last attempt, Current status

**Server Status:**
- Backend, Database, Uptime

---

## 🎨 Auto-Image Bot - Complete Manual

### ✨ Main Features

- **🖼️ Image loading:** PNG, JPEG compatible
- **📏 Smart resizing:** Automatic adjustment with preview
- **🎯 Precise position:** Exact selection of starting point  
- **⚡ Optimized painting:** 20-pixel batches (configurable 1-50)
- **🔋 Charge management:** Smart cooldown system
- **💾 Save/Load progress:** Pause and resume projects
- **📁 JSON files:** Standard format for compatibility
- **🚫 Anti-ban:** Minimal API queries, human behavior
- **🌍 Translated interface:** 100% in your language

### 🚀 Step-by-Step Usage

#### 1️⃣ **Initialization**
```text
1. Run the bookmarklet on WPlace
2. Click "Initialize Auto-BOT"
3. Wait for available colors verification
```

#### 2️⃣ **Load Image**
```text
1. Click "Upload Image"
2. Select your file (PNG/JPEG)
3. Wait for processing and analysis
```

#### 3️⃣ **Resize (Optional)**
```text
1. Click "Resize Image"
2. Adjust width/height with sliders
3. Check "Keep aspect ratio" if desired
4. Preview the result
5. Confirm changes
```

#### 4️⃣ **Select Position**
```text
1. Click "Select Position"
2. Click on the canvas where you want it to start
3. The selected point will be the top-left corner
4. Confirm the shown position
```

#### 5️⃣ **Start Painting**
```text
1. Click "Start Painting"
2. The bot will paint automatically in batches
3. Watch progress in real-time
4. The bot will wait for cooldowns automatically
```

### 💾 Save/Load Progress System

#### 📁 **Save Progress**
```text
Option 1: When stopping manually
1. Click "Stop Painting" 
2. Custom modal appears
3. Select "💾 Save Progress"
4. JSON file downloads automatically

Option 2: Automatic naming
- Format: "image_X_Y_progress.json"
- Includes original name and coordinates
- Compatible with all browsers
```

#### 📂 **Load Progress**
```text
1. Click "Load Progress"
2. Select saved JSON file
3. Automatic data validation
4. Complete state restoration:
   ✅ Original image
   ✅ Starting position  
   ✅ Already painted pixels
   ✅ Remaining pixels
   ✅ Batch configuration
5. Continue where you left off
```

#### 🔄 **System Features**
- **🛡️ Robust validation:** Verifies file integrity
- **🎨 Color compatibility:** Checks current vs saved palette
- **📊 Complete information:** Progress, position, metadata
- **⚡ Instant loading:** Restores state in seconds
- **🔒 Safe format:** Standard JSON, no executables

### ⚙️ Advanced Configuration

#### 🎨 **Pixels per Batch**
- **Range:** 1-50 pixels
- **Default:** 20 pixels
- **Recommended:** 15-25 for better performance
- **Modify:** Configuration panel or `setPixelsPerBatch(20)`

#### ⏱️ **Cooldown System**
- **Regeneration:** 1 charge every 30 seconds
- **Automatic:** Bot waits automatically
- **Smart:** Calculates remaining time without excessive queries
- **Optimized:** Minimal `/me` calls to avoid bans

#### 📊 **Real-time Information**
- **Progress:** Painted vs total pixels
- **Charges:** Available (integer number)
- **Estimated time:** Approximate remaining duration
- **Status:** Painting, waiting cooldown, paused

### 🔧 Console Functions

```javascript
// Debug coordinates
debugCoords()

// Debug charges
debugCharges()

// Set pixels per batch
setPixelsPerBatch(25)

// View current state
console.log(state)

// Debug progress system
console.log('Progress:', state.paintedPixels, '/', state.totalPixels)
```

### 🎯 Progress System Use Cases

#### 📋 **Large Projects**
- **Complex art:** Divide multi-day jobs
- **Long sessions:** Pause when you need the computer
- **Time management:** Schedule painting at specific times

#### 🔄 **Total Flexibility**
- **Device change:** Continue on another computer
- **Interruptions:** Unexpected pauses without loss
- **Experimentation:** Try different configurations

#### 📁 **Organization**
- **Multiple projects:** Manage several jobs simultaneously
- **Backups:** Backup your progress
- **Sharing:** Send your progress to other users

### ⚠️ Tips and Best Practices

#### ✅ **Recommendations**
- **Small images:** Start with 50x50px to learn
- **Central position:** Avoid canvas edges
- **Moderate batches:** 15-25 pixels per batch works better
- **Monitor process:** Check progress occasionally
- **💾 Save frequently:** Especially on large projects
- **📁 Organize files:** Name your projects descriptively
- **🔄 Check compatibility:** Before loading old progress

#### ❌ **Avoid**
- **Very large images:** Will consume many charges
- **Very large batches:** Can cause API errors
- **Edge positions:** Coordinates near 0 or 3000
- **Multiple instances:** Only run one bot per tab
- **❌ Corrupt files:** Don't modify JSONs manually
- **⚠️ Old progress:** Check color compatibility

---

## ⚠️ Important

### 🛡️ Anti-Ban System

Both bots include advanced protections:

- **⏱️ Smart delays:** Realistic time between actions
- **📡 Optimized API:** Minimal server queries
- **🔄 Limited retries:** Maximum 3 attempts per operation
- **🕐 Automatic cooldowns:** Respects server limits
- **🤖 Human behavior:** Natural usage patterns

### 📜 Terms of Use

- ✅ **Personal use:** Allowed for own accounts
- ✅ **Modification:** You can adapt the code
- ❌ **Commercial:** Don't sell or redistribute
- ❌ **Abuse:** No spam or attacks
- ⚖️ **Responsibility:** Use at your own risk

---

## 🆘 Support

### 🔍 Common Problem Solutions

| Problem | Cause | Solution |
|----------|-------|----------|
| **"Calibration required"** | No valid coordinates | Paint a pixel manually |
| **"No charges available"** | Insufficient charges | Wait for regeneration (30s/charge) |
| **Error 403/429** | API limits | Increase delays |
| **"Dangerous coordinates"** | Too close to edge | Recalibrate in central zone |
| **Bot not responding** | JavaScript error | Reload page and retry |
| **"Error loading progress"** | Invalid JSON file | Check file integrity |
| **"Color incompatibility"** | Different palette | Restart bot and check colors |
| **Progress doesn't save** | Download permissions | Allow downloads in browser |

### 📞 Contact

- **🐛 Report bugs:** Issues on GitHub
- **💡 Suggestions:** Discussions on GitHub  
- **📖 Documentation:** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

### 🔄 Updates

Bots update automatically when you run the bookmarklet. You always get the latest version.

---

## 🤝 Contributing

Want to contribute to the project? Great! 

👉 **[Check the complete contribution guide](CONTRIBUTING.md)**

Includes:
- 🏗️ Project structure and architecture
- 🔧 Development and build scripts
- 📝 Code and commit standards
- 🚀 Step-by-step development workflow

---

<p align="center">
  <strong>🎨 Made with ❤️ for the WPlace community</strong><br>
  <em>Use responsibly and enjoy creating art pixel by pixel</em>
</p>
