// ═══════════════════════════════════════════════════════════
// CONFIGURATION PORTFOLIO - Données centralisées
// Modifie ce fichier pour changer les images/textes partout
// ═══════════════════════════════════════════════════════════

export const SECTIONS_DATA = [
  {
    id: 's1',
    title: { src: 'images/sections/s1.svg', alt: 'Affiches' },
    cards: [
      { title: 'La Petite Sirène', 
        description: 'Affiche pour le spectacle des Ateliers Buissoniers', 
        image: 'images/portfolio/petitesirene.png', 
        ratio: 'portrait'},
      { title: 'Le Petit Nicolas', 
        description: 'Affiche pour le spectacle des Ateliers Buissoniers', 
        image: 'images/portfolio/petitnicolas.png', 
        ratio: 'portrait'},
      {title: 'Alice', 
        description: 'Affiche pour le spectacle des Ateliers Buissoniers', 
        image: 'images/portfolio/alice.jpg', 
        ratio: 'portrait'},
      { title: 'Corgis de Genève', description: 'Affiche pour la parade annuelle des Corgis de Genève', image: 'images/portfolio/corgis.png', ratio: 'portrait' },
      { title: 'La Troublante Histoire du Rouge de ses Yeux', description: 'Affiche pour le film de Giovanni Lulendo Munsungai', image: 'images/portfolio/troublante.png', ratio: 'portrait' },
      { title: 'L\'Homme du Lac', description: 'Cover de l\'album de l\'Homme du Lac', image: 'images/portfolio/hdl.png', ratio: 'square' },
      { title: 'Clé de Sol', description: 'Affiche pour l\'ouverture d\'un magasin de musique', image: 'images/portfolio/cledesol.png', ratio: 'portrait' },
    ]
  },
  {
    id: 's2',
    title: { src: 'images/sections/s2.svg', alt: 'Illustrations' },
    cards: [
      { title: 'Semainier Enfant', description: 'Création d\'un petit personnage pour un semainier', image: 'images/portfolio/semainierlion.png', ratio: 'portrait' },
      { title: 'Alien M. Bablet', description: 'Encre et peinture numérique dans le style de M. Bablet', image: 'images/portfolio/bablet.jpg', ratio: 'portrait' },
      { title: 'Alien K. Haring', description: 'Illustration numérique dans le style de K. Haring', image: 'images/portfolio/keith.jpg', ratio: 'portrait' },
      { title: 'Alien A. Mucha', description: 'Illustration numérique dans le style de Alphonse Mucha', image: 'images/portfolio/mucha.png', ratio: 'portrait' },
      { title: 'Juliette, Gaston et Achille', description: 'Character design pour un jeu vidéo', image: 'images/portfolio/juliette.jpg', ratio: 'landscape' },
      { title: 'Le skatepark de Juliette', description: 'Décor pour un jeu vidéo', image: 'images/portfolio/skatepark.jpg', ratio: 'landscape' },
    ]
  },
  {
    id: 's3',
    title: { src: 'images/sections/s3.svg', alt: 'Peintures' },
    cards: [
      { title: 'Ma Maison dans la Forêt', description: 'Peinture à l\'acrylique', image: 'images/portfolio/maisonforet.png', ratio: 'portrait', 
        // 🆕 EXEMPLE :
        printAvailable: false,
        printSizes: [
          { 
            name: 'A3 (29,7 × 42 cm)', 
            price: 45,
            stripeLink: 'https://google.com',
            stripeLinkFramed: 'https://google.com'
          }
        ]
      },
      { title: 'La Grenouille du Chill', description: 'Peinture à l\'acrylique', image: 'images/portfolio/grenouillechill.png', ratio: 'portrait'},
      { title: 'La Fille du Lac', description: 'Peinture à l\'acrylique', image: 'images/portfolio/filledulac.png', ratio: 'portrait' },
      { title: 'Mon Gentil Monstre', description: 'Peinture à l\'aquarelle', image: 'images/portfolio/monstregentil.jpg', ratio: 'portrait' },
    ] 
  },
  {
    id: 's4',
    title: { src: 'images/sections/s4.svg', alt: 'Marketing' },
    cards: [
      { title: 'Lunawave Retreats', description: 'Logo design pour Lunawave Retreats', image: 'images/portfolio/lunawave.png', ratio: 'square' },
      { title: 'La Sargane', description: 'Logo design pour La Sargane', image: 'images/portfolio/sargane.png', ratio: 'portrait' },
      { title: 'Dog & Bio', description: 'Packaging pour la marque Dog & Bio', image: 'images/portfolio/dogbio.png', ratio: 'portrait' },
    ]
  },
  {
    id: 's5',
    title: { src: 'images/sections/s5.svg', alt: 'Livres' },
    cards: [
      { title: 'BD Fruits et Légumes', description: 'Planche réalisée pour promouvoir les fruits et légumes de saison', image: 'images/portfolio/bdlegumes.jpg', ratio: 'portrait' },
      { title: 'Coccinelle, Demoiselle', description: 'Illustration de comptine', image: 'images/portfolio/cox.png', ratio: 'landscape' },
      { title: 'Hopi dans son Jardin', description: 'Couverture d\'imagier pour enfants', image: 'images/portfolio/hopicover.png', ratio: 'square' },
      { title: 'Hopi dans son Jardin', description: 'Imagier pour enfants', image: 'images/portfolio/hopip1.png', ratio: 'landscape' },
    ]
  }
];

export const NAVIGATION_BUTTONS = [
  { id: 's1', src: 'images/boutons/s1.svg', label: 'Affiches' },
  { id: 's2', src: 'images/boutons/s2.svg', label: 'Illustrations' },
  { id: 's3', src: 'images/boutons/s3.svg', label: 'Peintures' },
  { id: 's4', src: 'images/boutons/s4.svg', label: 'Marketing' },
  { id: 's5', src: 'images/boutons/s5.svg', label: 'Livres' },
  { id: 'contact', src: 'images/boutons/contact.svg', label: 'Contact' }
];

// 🆕 NOUVEAU : Configuration pour les prints
export const PRINT_CONFIG = {
  framingPrice: 20, // Prix de l'encadrement
  pickupLocation: 'Nuit Noire Tattoo, Vernier, Suisse',
  pickupInfo: 'Retrait gratuit possible à Nuit Noire Tattoo, Vernier'
};