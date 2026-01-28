# Morai Guide 🇲🇦🤖

**Morai Guide** est une application web intelligente dédiée à la découverte du Maroc.  
Elle combine **intelligence artificielle**, **chat interactif** et **contenu communautaire** pour offrir aux utilisateurs une expérience moderne, fluide et informative autour des villes, lieux, conseils de sécurité et expériences de voyage au Maroc.

---

## 🚀 Fonctionnalités principales

- 💬 Chat intelligent avec IA (Gemini)  
- 🏙️ Informations détaillées sur les villes du Maroc  
- 📍 Gestion des spots et lieux touristiques  
- ⚠️ Sensibilisation aux scams / arnaques courantes  
- 📰 Feed de posts communautaires  
- ✍️ Création et gestion de posts utilisateurs  
- 🔐 Authentification (login / register)  
- 🛡️ Routes protégées (utilisateur & admin)  
- 🧑‍💼 Dashboard administrateur (CRUD complet)  
- 📱 Interface responsive et moderne  

---

## 🛠️ Technologies utilisées

- **React.js**
- **JavaScript (ES6+)**
- **CSS / Tailwind**
- **JSON Server** (base de données locale)
- **API Gemini** (IA conversationnelle)
- **React Router**
- **Variables d’environnement (.env)**

---

## 📁 Structure du projet
morocco-ai-guide/
├─ db/
│ └─ db.json
│
├─ public/
│
├─ src/
│ ├─ db/
│ │ └─ db.json
│ │
│ ├─ api/
│ │ ├─ geminiApi.js
│ │ ├─ jsonApi.js
│ │ └─ uploadHelper.js
│ │
│ ├─ auth/
│ │ ├─ Login.jsx
│ │ ├─ Register.jsx
│ │ └─ authService.js
│ │
│ ├─ layouts/
│ │ ├─ ClientLayout.jsx
│ │ ├─ AdminLayout.jsx
│ │ └─ AuthLayout.jsx
│ │
│ ├─ routes/
│ │ ├─ AppRoutes.jsx
│ │ ├─ PrivateRoute.jsx
│ │ └─ AdminRoute.jsx
│ │
│ ├─ pages/
│ │ ├─ admin/
│ │ │ ├─ AdminDashboard.jsx
│ │ │ ├─ ManageCities.jsx
│ │ │ ├─ ManageSpots.jsx
│ │ │ ├─ ManageScams.jsx
│ │ │ └─ ManagePosts.jsx
│ │ │
│ │ ├─ ChatPage.jsx
│ │ ├─ CreatePostPage.jsx
│ │ ├─ FeedPage.jsx
│ │ ├─ PostCard.jsx
│ │ ├─ ProfilePage.jsx
│ │ └─ userPosts.jsx
│ │
│ ├─ App.jsx
│ ├─ index.js
│ └─ index.css
│
├─ .env
├─ package.json
└─ README.md

---

## ⚙️ Installation & Lancement

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/your-repo/morocco-ai-guide.git
cd morocco-ai-guide
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Configurer les variables d’environnement

Créer un fichier .env à la racine :
```bash
REACT_APP_GEMINI_KEY=your_api_key_here
```

### 4️⃣ Lancer le serveur JSON
```bash
npx json-server --watch db/db.json --port 3001
```

### 5️⃣ Lancer l’application
```bash
npm run dev
