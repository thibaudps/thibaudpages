# Thibaud Pagès Designs — Site web

## Structure des fichiers

```
thibaud-pages/
│
├── index.html      ← Structure HTML (ne pas toucher sauf refonte)
├── style.css       ← Mise en forme (ne pas toucher sauf refonte)
├── main.js         ← Interactions / logique (ne pas toucher sauf refonte)
│
├── config.js       ← ✏️  SEUL FICHIER À MODIFIER pour le contenu
│
└── images/         ← Dossier pour les images de projets
    └── (vos photos)
```

---

## Comment modifier le contenu

Ouvrir **config.js** uniquement. Tout le site se met à jour automatiquement.

### Changer les infos générales
```js
name: "Thibaud Pagès Designs",
tagline: "Design graphique & Illustration — Pays de Gex",
description: "Je travaille avec...",
```

### Ajouter un projet
Ajouter un objet dans le tableau `projects` :
```js
{
  title: "Nom du projet",
  cat: "Identité",           // doit correspondre à un filtre existant
  year: "2025",
  image: "images/monprojet.jpg",  // laisser "" si pas encore d'image
  placeholder: "XX",         // texte affiché si pas d'image
  color: "#E8E2D8",          // couleur de fond du placeholder
  href: "https://...",       // lien vers la page projet (ou "#")
},
```

### Ajouter une image à un projet
1. Déposer l'image dans le dossier `images/`
2. Dans `config.js`, renseigner le chemin : `image: "images/nom-fichier.jpg"`
3. Le placeholder disparaît automatiquement dès qu'une image est définie.

### Modifier les palettes de couleur
Chaque objet dans `themes` correspond à un bouton dans le pot de peinture :
```js
{
  label: "Ma palette",
  swatch: "#couleur-du-bouton",
  bg:     "#fond",
  fg:     "#texte",
  border: "#bordures",
  mid:    "#texte-secondaire",
  card:   "#fond-cartes",
  active: true,  // ajouter seulement sur la palette par défaut
},
```

### Modifier les filtres
```js
filters: ["Tout", "Identité", "Affiche", "Illustration", "Édition", "Web"],
```
⚠️  Si vous changez un filtre, pensez à mettre à jour le champ `cat` des projets correspondants.

---

## Déploiement

Le site est en HTML/CSS/JS pur, sans dépendances ni build.
Il suffit d'uploader les fichiers sur n'importe quel hébergement statique
(GitHub Pages, Hostinger, Netlify, etc.).
