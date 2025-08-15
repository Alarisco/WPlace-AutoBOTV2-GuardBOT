# WPlace AutoBOT

<!-- Sélecteur de langues -->
<p align="center">
  <strong>🌍 Langues disponibles / Available Languages / Idiomas disponibles:</strong><br>
  <a href="../README.md">🇪🇸 Español</a> |
  <a href="README-en.md">🇺🇸 English</a> |
  <a href="README-fr.md">🇫🇷 Français</a>
</p>

<!-- Badges centrés -->
<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=Alarisco.WPlace-AutoBOTV2&left_color=black&right_color=blue&style=for-the-badge" alt="Visites" />
  
  <img src="https://img.shields.io/github/stars/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/Alarisco/WPlace-AutoBOTV2?style=for-the-badge&logo=github"
       alt="GitHub Forks" />
  <img src="https://img.shields.io/github/issues/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="GitHub Issues" />
  <img src="https://img.shields.io/github/last-commit/Alarisco/WPlace-AutoBOTV2?style=for-the-badge"
       alt="Dernier commit" />
  <img src="https://img.shields.io/badge/Licence-MIT-green?style=for-the-badge"
       alt="Licence" />
</p>

## 🤖 WPlace AutoBOT

<p align="center">
  <img src="https://img.shields.io/badge/WPlace-AutoBOT-blue?style=for-the-badge" alt="WPlace AutoBOT">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge" alt="JavaScript">
</p>

<p align="center">
  <strong>Scripts automatisés pour <a href="https://wplace.live" target="_blank">WPlace</a></strong><br>
  Farming automatique d'expérience et création avancée de pixel art
</p>

---

## 📋 Table des Matières

- [🌍 Support Multi-langues](#-support-multi-langues)
- [🚀 Démarrage Rapide](#-démarrage-rapide)
- [🔧 Bots Disponibles](#-bots-disponibles)
- [🌾 Auto-Farm Bot](#-auto-farm-bot)
- [🎨 Auto-Image Bot](#-auto-image-bot)
- [📖 Guides Détaillés](#-guides-détaillés)
- [⚠️ Important](#️-important)
- [🆘 Support](#-support)

---

## 🌍 Support Multi-langues

**WPlace AutoBOT parle maintenant votre langue !** 🗣️

### 🎯 Langues Disponibles
- **🇪🇸 Español** - Support complet en espagnol
- **🇺🇸 English** - Support complet en anglais
- **🇫🇷 Français** - Par défaut pour les navigateurs français

### ✨ Fonctionnalités du Système i18n
- **🔄 Détection automatique** : Détecte la langue de votre navigateur
- **🎛️ Sélecteur manuel** : Changez de langue à tout moment
- **💾 Mémoire persistante** : Se souvient de votre préférence
- **🔗 Synchronisation** : Tous les bots utilisent la même langue
- **📱 Interface complète** : 100% traduite

### 📖 Documentation par Langue
- **[🇪🇸 Documentation Espagnole](../README.md)**
- **[🇺🇸 Documentation Anglaise](README-en.md)**
- **[🇫🇷 Documentation Française](README-fr.md)** (ce fichier)

### 🎮 Comment Changer de Langue
1. Exécutez n'importe quel bot (Launcher recommandé)
2. Cherchez le sélecteur de langues dans le coin supérieur gauche 🌐
3. Cliquez et sélectionnez votre langue préférée
4. Toute l'interface se met à jour automatiquement ! ✨

---

## 🚀 Démarrage Rapide

### Installation Universelle

1. **Copiez le code du bot désiré**
2. **Créez un marque-page dans votre navigateur :**
   - Clic droit sur la barre de marque-pages → "Ajouter une page"
   - Nom : `WPlace Bot`
   - URL : Collez le code JavaScript
3. **Utilisez-le sur WPlace :**
   - Allez sur [wplace.live](https://wplace.live)
   - Connectez-vous
   - Cliquez sur votre marque-page

---

## 🔧 Bots Disponibles

### 🧭 Launcher (recommandé)
Un seul marque-page qui vous permet de choisir entre Auto-Farm ou Auto-Image à chaque exécution.

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOT/refs/heads/main/Auto-Launcher.js").then(r=>r.text()).then(eval)
```

— Ou utilisez les bots séparément —

### 🌾 Auto-Farm Bot
**Farming automatique d'expérience et de charges**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Farm.js").then(t=>t.text()).then(eval);
```

**Fonctionnalités :**
- ✅ Farming automatique 24/7
- ✅ Système anti-ban intégré
- ✅ Calibration automatique
- ✅ Gestion intelligente des charges
- ✅ Configuration avancée

### 🎨 Auto-Image Bot
**Création automatique de pixel art à partir d'images**

```javascript
javascript:fetch("https://raw.githubusercontent.com/Alarisco/WPlace-AutoBOTV2/refs/heads/main/Auto-Image.js").then(t=>t.text()).then(eval);
```

**Fonctionnalités :**
- ✅ Convertit les images en pixel art
- ✅ Redimensionnement intelligent
- ✅ Sélection précise de position
- ✅ Peinture par lots optimisée
- ✅ Système de cooldown automatique
- ✅ **💾 Sauvegarder/Charger le progrès**
- ✅ **⏸️ Mettre en pause et reprendre les tâches**
- ✅ Interface 100% traduite

---

## 📖 Guides Détaillés

## 🌾 Auto-Farm Bot - Manuel Complet

### ⚙️ Configuration

| Paramètre | Plage | Recommandé | Description |
|-----------|-------|-------------|-------------|
| **Délai (sec)** | 5-300 | 15-30 | Temps entre les lots de pixels |
| **Charges Min.** | 1-50 | 10-20 | Charges minimales avant de peindre |
| **Pixels/Lot** | 1-50 | 10-30 | Pixels simultanés par lot |
| **Mode Couleur** | Aléatoire/Fixe | Aléatoire | Sélection des couleurs |

### 🎮 Contrôles

- **🟢 Démarrer :** Démarre le farming automatique continu
- **🔵 Une fois :** Peint un seul lot (utile pour les tests)
- **🔴 Arrêter :** Arrête complètement le bot

### 📊 Panneau de Statut

**Informations Utilisateur :**
- Utilisateur, Charges, Peints, Dernière tentative, Statut actuel

**Statut du Serveur :**
- Backend, Base de données, Uptime

---

## 🎨 Auto-Image Bot - Manuel Complet

### ✨ Fonctionnalités Principales

- **🖼️ Chargement d'images :** Compatible PNG, JPEG
- **📏 Redimensionnement intelligent :** Ajustement automatique avec aperçu
- **🎯 Position précise :** Sélection exacte du point de départ  
- **⚡ Peinture optimisée :** Lots de 20 pixels (configurable 1-50)
- **🔋 Gestion des charges :** Système de cooldown intelligent
- **💾 Sauvegarder/Charger le progrès :** Mettre en pause et reprendre les projets
- **📁 Fichiers JSON :** Format standard pour la compatibilité
- **🚫 Anti-ban :** Requêtes API minimales, comportement humain
- **🌍 Interface traduite :** 100% dans votre langue

### 🚀 Utilisation Étape par Étape

#### 1️⃣ **Initialisation**
```text
1. Exécutez le bookmarklet sur WPlace
2. Cliquez sur "Initialiser Auto-BOT"
3. Attendez la vérification des couleurs disponibles
```

#### 2️⃣ **Charger une Image**
```text
1. Cliquez sur "Télécharger Image"
2. Sélectionnez votre fichier (PNG/JPEG)
3. Attendez le traitement et l'analyse
```

#### 3️⃣ **Redimensionner (Optionnel)**
```text
1. Cliquez sur "Redimensionner Image"
2. Ajustez largeur/hauteur avec les curseurs
3. Cochez "Garder les proportions" si désiré
4. Prévisualisez le résultat
5. Confirmez les modifications
```

#### 4️⃣ **Sélectionner la Position**
```text
1. Cliquez sur "Sélectionner Position"
2. Cliquez sur le canvas où vous voulez que ça commence
3. Le point sélectionné sera le coin supérieur gauche
4. Confirmez la position affichée
```

#### 5️⃣ **Commencer la Peinture**
```text
1. Cliquez sur "Commencer Peinture"
2. Le bot peindra automatiquement par lots
3. Observez le progrès en temps réel
4. Le bot attendra les cooldowns automatiquement
```

### 💾 Système Sauvegarder/Charger le Progrès

#### 📁 **Sauvegarder le Progrès**
```text
Option 1 : Lors de l'arrêt manuel
1. Cliquez sur "Arrêter Peinture" 
2. Modal personnalisé apparaît
3. Sélectionnez "💾 Sauvegarder Progrès"
4. Le fichier JSON se télécharge automatiquement

Option 2 : Nommage automatique
- Format : "image_X_Y_progres.json"
- Inclut le nom original et les coordonnées
- Compatible avec tous les navigateurs
```

#### 📂 **Charger le Progrès**
```text
1. Cliquez sur "Charger Progrès"
2. Sélectionnez le fichier JSON sauvegardé
3. Validation automatique des données
4. Restauration complète de l'état :
   ✅ Image originale
   ✅ Position de départ  
   ✅ Pixels déjà peints
   ✅ Pixels restants
   ✅ Configuration des lots
5. Continuez où vous vous êtes arrêté
```

#### 🔄 **Fonctionnalités du Système**
- **🛡️ Validation robuste :** Vérifie l'intégrité des fichiers
- **🎨 Compatibilité des couleurs :** Vérifie la palette actuelle vs sauvegardée
- **📊 Informations complètes :** Progrès, position, métadonnées
- **⚡ Chargement instantané :** Restaure l'état en quelques secondes
- **🔒 Format sûr :** JSON standard, pas d'exécutables

### ⚙️ Configuration Avancée

#### 🎨 **Pixels par Lot**
- **Plage :** 1-50 pixels
- **Par défaut :** 20 pixels
- **Recommandé :** 15-25 pour de meilleures performances
- **Modifier :** Panneau de configuration ou `setPixelsPerBatch(20)`

#### ⏱️ **Système de Cooldown**
- **Régénération :** 1 charge toutes les 30 secondes
- **Automatique :** Le bot attend automatiquement
- **Intelligent :** Calcule le temps restant sans requêtes excessives
- **Optimisé :** Appels `/me` minimaux pour éviter les bans

#### 📊 **Informations en Temps Réel**
- **Progrès :** Pixels peints vs total
- **Charges :** Disponibles (nombre entier)
- **Temps estimé :** Durée restante approximative
- **Statut :** Peinture, attente cooldown, en pause

### 🔧 Fonctions Console

```javascript
// Debug des coordonnées
debugCoords()

// Debug des charges
debugCharges()

// Définir pixels par lot
setPixelsPerBatch(25)

// Voir l'état actuel
console.log(state)

// Debug du système de progrès
console.log('Progrès:', state.paintedPixels, '/', state.totalPixels)
```

### 🎯 Cas d'Usage du Système de Progrès

#### 📋 **Projets Importants**
- **Art complexe :** Diviser les travaux de plusieurs jours
- **Sessions longues :** Pause quand vous avez besoin de l'ordinateur
- **Gestion du temps :** Programmer la peinture à des heures spécifiques

#### 🔄 **Flexibilité Totale**
- **Changement d'appareil :** Continuer sur un autre ordinateur
- **Interruptions :** Pauses imprévues sans perte
- **Expérimentation :** Essayer différentes configurations

#### 📁 **Organisation**
- **Multiples projets :** Gérer plusieurs tâches simultanément
- **Sauvegardes :** Sauvegarde de votre progrès
- **Partage :** Envoyer votre progrès à d'autres utilisateurs

### ⚠️ Conseils et Bonnes Pratiques

#### ✅ **Recommandations**
- **Petites images :** Commencer avec 50x50px pour apprendre
- **Position centrale :** Éviter les bords du canvas
- **Lots modérés :** 15-25 pixels par lot fonctionne mieux
- **Superviser le processus :** Vérifier le progrès occasionnellement
- **💾 Sauvegarder fréquemment :** Surtout sur les gros projets
- **📁 Organiser les fichiers :** Nommer vos projets de manière descriptive
- **🔄 Vérifier la compatibilité :** Avant de charger un ancien progrès

#### ❌ **Éviter**
- **Images très grandes :** Consommera beaucoup de charges
- **Lots très grands :** Peut causer des erreurs d'API
- **Positions sur les bords :** Coordonnées près de 0 ou 3000
- **Instances multiples :** N'exécuter qu'un bot par onglet
- **❌ Fichiers corrompus :** Ne pas modifier les JSON manuellement
- **⚠️ Progrès ancien :** Vérifier la compatibilité des couleurs

---

## ⚠️ Important

### 🛡️ Système Anti-Ban

Les deux bots incluent des protections avancées :

- **⏱️ Délais intelligents :** Temps réaliste entre les actions
- **📡 API optimisée :** Requêtes serveur minimales
- **🔄 Tentatives limitées :** Maximum 3 tentatives par opération
- **🕐 Cooldowns automatiques :** Respecte les limites du serveur
- **🤖 Comportement humain :** Patterns d'usage naturels

### 📜 Conditions d'Utilisation

- ✅ **Usage personnel :** Autorisé pour vos propres comptes
- ✅ **Modification :** Vous pouvez adapter le code
- ❌ **Commercial :** Ne pas vendre ou redistribuer
- ❌ **Abus :** Pas de spam ou d'attaques
- ⚖️ **Responsabilité :** Utilisation à vos propres risques

---

## 🆘 Support

### 🔍 Solutions aux Problèmes Courants

| Problème | Cause | Solution |
|----------|-------|----------|
| **"Calibration requise"** | Pas de coordonnées valides | Peindre un pixel manuellement |
| **"Pas de charges disponibles"** | Charges insuffisantes | Attendre la régénération (30s/charge) |
| **Erreur 403/429** | Limites API | Augmenter les délais |
| **"Coordonnées dangereuses"** | Trop près du bord | Recalibrer en zone centrale |
| **Bot ne répond pas** | Erreur JavaScript | Recharger la page et réessayer |
| **"Erreur chargement progrès"** | Fichier JSON invalide | Vérifier l'intégrité du fichier |
| **"Incompatibilité couleurs"** | Palette différente | Redémarrer le bot et vérifier les couleurs |
| **Le progrès ne se sauvegarde pas** | Permissions de téléchargement | Autoriser les téléchargements dans le navigateur |

### 📞 Contact

- **🐛 Signaler des bugs :** Issues sur GitHub
- **💡 Suggestions :** Discussions sur GitHub  
- **📖 Documentation :** [GitHub Wiki](https://github.com/Alarisco/WPlace-AutoBOT)

### 🔄 Mises à Jour

Les bots se mettent à jour automatiquement quand vous exécutez le bookmarklet. Vous obtenez toujours la dernière version.

---

## 🤝 Contribuer

Vous voulez contribuer au projet ? Génial ! 

👉 **[Consultez le guide complet de contribution](CONTRIBUTING.md)**

Inclut :
- 🏗️ Structure du projet et architecture
- 🔧 Scripts de développement et build
- 📝 Standards de code et commits
- 🚀 Workflow de développement étape par étape

---

<p align="center">
  <strong>🎨 Fait avec ❤️ pour la communauté WPlace</strong><br>
  <em>Utilisez de manière responsable et amusez-vous à créer de l'art pixel par pixel</em>
</p>
