# Bivouac Sauvage — Éco-hébergements insolites en Montagne de Reims

Projet noté individuel du module **TailwindCSS & SASS** — **ESGI Reims (Bac+3 Développement Web)**  
**Enseignant :** Cédric Navet  
**Étudiant :** Hugo Rayaume  

---

## 🌲 Présentation du Projet

**Bivouac Sauvage** est un éco-domaine forestier fictif de 15 hectares situé à **Verzy (Montagne de Reims)**. Le site propose la découverte, le filtrage et la réservation directe de **12 hébergements atypiques** intégrés dans la forêt (dômes géodésiques, cabanes perchées, tentes safari et roulottes en bois massif), sans intermédiaire.

Toutes les informations officielles de l'Étape 1 sont détaillées dans le fichier [docs/fiche-de-cadrage.md](docs/fiche-de-cadrage.md).

---

## 🛠️ Stack Technique & Contraintes Respectées

- **Vite & React 19 (TypeScript)**
- **Tailwind CSS v4** :
  - Définition complète des tokens dans `@theme` (`--color-forest-*`, `--color-accent-*`, polices, surfaces).
  - **Aucune couleur codée en dur** dans les composants.
  - Classes Tailwind complètes écrites en toutes lettres (aucune interpolation dynamique proscrite).
- **SASS (sass-embedded / Dart Sass 3.0 ready)** :
  - Composant éco-badge stylé en CSS Module (`EcoBadge.module.scss`).
  - Architecture modulaire via `@use` (aucun `@import`).
  - Partials dédiés : `_variables.scss`, `_mixins.scss`, `_functions.scss`.
  - Utilisation d'une boucle `@each` sur les thèmes et d'une fonction de calcul mathématique pour garantir le contraste accessible WCAG AA.
- **Storybook v8 avec `@storybook/addon-a11y`** :
  - 4 composants de base documentés : `Button`, `InputField`, `HebergementCard`, `EcoBadge`.
  - Couverture des états : survol, focus, désactivé, erreur, chargement, contenu long.
  - Zéro violation d'accessibilité.
- **Données JSON Réalistes** :
  - Fichier `src/data/hebergements.json` contenant 12 éléments complets et différenciés (sans aucun "Lorem ipsum").
- **Accessibilité & Ergonomie UX** :
  - Cibles tactiles d'au moins 44 px sur mobile.
  - Contrastes de texte conformes WCAG AA (≥ 4.5:1).
  - Navigation complète au clavier avec anneau de focus visible et skip-link (`#main-content`).
  - Formulaire accessible avec étiquettes explicites, validation temps réel et messages d'erreurs descriptifs.

---

## 📱 Écrans Disponibles

1. **Accueil (`AccueilScreen`)** : proposition de valeur immédiate, test des 5 secondes réussi, 3 piliers éco-responsables, sélection coups de cœur et avis clients.
2. **Écran Interactif (`ExplorerScreen`)** :
   - Recherche textuelle par mots-clés.
   - Filtres combinables : par type d'architecture, par capacité minimale (voyageurs), switch "Animaux acceptés".
   - Tri dynamique (prix croissant/décroissant, notes clients, capacité).
   - Modal de fiche détaillée (`DetailModal`) avec galerie, caractéristiques et bouton de réservation direct.
   - **État vide complet** avec message bienveillant et bouton de réinitialisation en 1 clic.
3. **Écran d'Action (`ReservationScreen`)** :
   - Formulaire multi-étapes avec validation en direct.
   - Choix de l'hébergement, sélection des dates avec calcul automatique du nombre de nuits.
   - Gestion des voyageurs, de l'option animal de compagnie et du Pack Micro-aventure.
   - Devis dynamique calculé en temps réel (sous-total nuits + options = total TTC).
4. **Confirmation (`ConfirmationScreen`)** :
   - Confirmation immédiate avec numéro de référence unique (`BV-2026-XXXX`).
   - Récapitulatif complet du séjour et instructions d'accès au domaine de Verzy.
   - Bouton d'impression du bon de séjour.

---

## 🚀 Installation & Lancement

```bash
# 1. Cloner le dépôt
git clone git@github.com:hugo-ry02/BivouacSauvage.git
cd BivouacSauvage

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement Vite
npm run dev

# 4. Lancer Storybook
npm run storybook

# 5. Compiler pour la production
npm run build
```

---

## 📂 Structure du Répertoire

```text
├── docs/
│   └── fiche-de-cadrage.md       # Cadrage officiel Étape 1 pour l'enseignant
├── src/
│   ├── components/
│   │   ├── layout/               # Navbar & Footer accessibles
│   │   ├── screens/              # Accueil, Explorer, Reservation, Confirmation
│   │   └── ui/                   # Design System (Button, Input, Card, EcoBadge, Modal)
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── EcoBadge/         # Composant CSS Module SASS avec @use
│   │       ├── Input/
│   │       └── Modal/
│   ├── data/
│   │   └── hebergements.json     # Données réalistes des 12 hébergements
│   ├── styles/                   # Partials SASS (_variables, _mixins, _functions)
│   ├── types/                    # Définitions TypeScript
│   ├── App.tsx                   # Gestion de l'état global et navigation
│   ├── index.css                 # Configuration Tailwind 4 @theme
│   └── main.tsx
├── .storybook/                   # Configuration Storybook v8 & addon a11y
└── package.json
```
