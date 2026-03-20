# 🚀 GUIDE COMPLET — ServiLink Frontend
### Projet de Fin de Cycle DITI 5 — ISI
---

## 📋 STRUCTURE DU PROJET

```
marketplace-client/
├── public/
│   └── index.html                    # Page HTML de base
├── src/
│   ├── assets/
│   │   └── mockData.js               # Données de test (services, catégories)
│   ├── components/
│   │   ├── Navbar.jsx / .module.css  # Barre de navigation
│   │   ├── ServiceCard.jsx / .module.css  # Carte d'un service
│   │   └── Footer.jsx / .module.css  # Pied de page
│   ├── pages/
│   │   ├── HomePage.jsx / .module.css       # Page d'accueil
│   │   ├── ServicesPage.jsx / .module.css   # Liste des services + filtres
│   │   ├── ServiceDetailPage.jsx / .module.css  # Détail d'un service
│   │   ├── ReservationPage.jsx / .module.css    # Formulaire de réservation (3 étapes)
│   │   └── ConfirmationPage.jsx / .module.css   # Page de confirmation
│   ├── App.jsx                       # Routing principal
│   ├── App.test.jsx                  # Tests unitaires
│   └── index.js / index.css          # Point d'entrée + CSS global
├── .gitlab-ci.yml                    # Pipeline GitLab CI
├── .github/workflows/ci.yml          # Pipeline GitHub Actions
├── Jenkinsfile                       # Pipeline Jenkins
└── package.json                      # Dépendances npm
```

---

## 🖥️ PAGES DE L'APPLICATION

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Hero, recherche, catégories, services populaires |
| Services | `/services` | Liste filtrée par catégorie / mot-clé |
| Détail | `/services/:id` | Fiche complète + sidebar réservation |
| Réservation | `/reserver/:id` | Formulaire 3 étapes (infos → besoin → récap) |
| Confirmation | `/confirmation` | Récap commande + timeline suivi |

---

## ⚙️ ÉTAPE 1 — PRÉREQUIS (ce qu'il faut installer)

### ✅ Tu as déjà :
- VS Code
- Git

### 📥 À installer : Node.js

**Node.js** est le moteur qui fait tourner React et npm.

1. Va sur **https://nodejs.org**
2. Télécharge la version **LTS** (ex: 20.x.x) — bouton vert à gauche
3. Lance l'installateur `.msi` → clique "Next" jusqu'à la fin
4. **Vérifie l'installation** — ouvre un terminal (PowerShell ou CMD) :
   ```bash
   node --version   # doit afficher v20.x.x
   npm --version    # doit afficher 10.x.x
   ```

---

## 🛠️ ÉTAPE 2 — CONFIGURER VS CODE

### Extensions recommandées (cherche dans l'onglet Extensions de VS Code) :

| Extension | Utilité |
|-----------|---------|
| **ES7+ React/Redux/React-Native snippets** | Raccourcis pour écrire React vite |
| **Prettier - Code formatter** | Formate ton code automatiquement |
| **Auto Rename Tag** | Renomme les balises JSX automatiquement |
| **GitLens** | Visualise l'historique Git dans VS Code |
| **Thunder Client** | Tester les APIs (comme Postman) |

---

## 📁 ÉTAPE 3 — DÉMARRER LE PROJET

### 3.1 — Dézipper et ouvrir dans VS Code

1. Dézippe le fichier `marketplace-client.zip`
2. Ouvre VS Code → **Fichier > Ouvrir le dossier** → sélectionne `marketplace-client`

### 3.2 — Installer les dépendances

Ouvre le terminal dans VS Code (**Ctrl + `**) et tape :

```bash
npm install
```

⏳ Attends que toutes les dépendances s'installent (première fois = ~1-2 min).
Un dossier `node_modules/` va apparaître — c'est normal.

### 3.3 — Lancer l'application

```bash
npm start
```

✅ Le navigateur s'ouvre automatiquement sur **http://localhost:3000**

---

## 🧭 ÉTAPE 4 — COMPRENDRE REACT (bases essentielles)

### 4.1 — Qu'est-ce qu'un composant ?

En React, tout est **composant** : un bloc de code JSX (HTML + JavaScript) réutilisable.

```jsx
// Exemple de composant simple
function Bonjour({ nom }) {
  return <h1>Bonjour, {nom} !</h1>;
}

// Utilisation
<Bonjour nom="Gilles" />
```

### 4.2 — Le useState (état local)

Permet de stocker et modifier une valeur dans un composant :

```jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0); // count = 0 au départ

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliqué {count} fois
    </button>
  );
}
```

### 4.3 — Le React Router (navigation)

Permet de passer d'une page à l'autre sans recharger :

```jsx
import { useNavigate, useParams } from 'react-router-dom';

// Naviguer vers une page
const navigate = useNavigate();
navigate('/services');

// Lire l'ID dans l'URL (/services/3 → id = "3")
const { id } = useParams();
```

### 4.4 — CSS Modules

Chaque composant a son propre fichier `.module.css` pour éviter les conflits :

```jsx
import styles from './MonComposant.module.css';

<div className={styles.maClasse}>...</div>
```

---

## 🔬 ÉTAPE 5 — LANCER LES TESTS

```bash
npm test
```

Appuie sur `a` pour lancer tous les tests. Tu dois voir 4 tests **PASS** en vert ✅.

---

## 📦 ÉTAPE 6 — BUILD DE PRODUCTION

```bash
npm run build
```

Un dossier `build/` est créé avec les fichiers optimisés prêts à déployer.

---

## 🐙 ÉTAPE 7 — PUSHER SUR GIT

### 7.1 — Initialiser Git dans le projet

Dans le terminal VS Code :

```bash
git init
git add .
git commit -m "feat: squelette ServiLink - côté client"
```

### 7.2 — Pusher sur GitLab (TP GitLab CI)

1. Crée un nouveau projet sur **https://gitlab.com** (New project → Create blank project)
2. Copie l'URL de ton dépôt, puis :

```bash
git remote add origin https://gitlab.com/TON_USERNAME/marketplace-client.git
git push -u origin main
```

✅ Le pipeline `.gitlab-ci.yml` se déclenche automatiquement → onglet **CI/CD > Pipelines**

### 7.3 — Pusher sur GitHub (TP GitHub Actions)

1. Crée un nouveau dépôt sur **https://github.com**
2. Puis :

```bash
git remote add github https://github.com/TON_USERNAME/marketplace-client.git
git push github main
```

✅ Le pipeline `.github/workflows/ci.yml` se déclenche → onglet **Actions**

---

## 🔄 RÉCAPITULATIF DES PIPELINES CI/CD

### Pipeline (3 étapes) :
```
install → test → build
```

| Étape | Commande | Description |
|-------|----------|-------------|
| install | `npm ci` | Installe les dépendances |
| test | `npm test` | Lance les 4 tests unitaires |
| build | `npm run build` | Génère le build de production |

---

## 🐛 PROBLÈMES COURANTS

| Erreur | Solution |
|--------|----------|
| `npm: command not found` | Node.js n'est pas installé — relis l'étape 1 |
| `Module not found` | Relance `npm install` |
| Port 3000 déjà utilisé | Tape `Y` quand React propose un autre port |
| Tests qui échouent | Vérifie que `npm install` a bien été fait |

---

## 🎯 PROCHAINES ÉTAPES POUR TON PROJET FINAL

Une fois à l'aise avec ce squelette, tu pourras :

1. **Connecter l'API** → remplacer `mockData.js` par de vrais appels à ton backend ASP.NET Core
2. **Ajouter l'authentification** → JWT + pages Login/Register
3. **Intégrer les paiements** → passerelle sécurisée
4. **Géolocalisation** → intégrer une carte pour filtrer par localisation
5. **Migrer vers Next.js** → comme prévu dans ton sujet, pour le SSR

---

*Projet : Gilles Junior KOANGA — DITI 5 — ISI 2025/2026*
