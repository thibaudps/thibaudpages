/**
 * ═══════════════════════════════════════════════════════════════
 * CONFIGURATION DU PORTFOLIO
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// 📍 POSITIONS DES SECTIONS (par rapport au centre du board)
// ═══════════════════════════════════════════════════════════════

export const sectionPositions = {
  s1: { 
    x: -2000,
    y: -800,
    label: 'Affiches', 
    color: 'red' 
  },
  s2: { 
    x: 2000,
    y: -800,
    label: 'Illustrations', 
    color: 'blue' 
  },
  s3: { 
    x: 2200,
    y: 300,
    label: 'Peintures', 
    color: 'purple' 
  },
  s4: { 
    x: 1600,
    y: 900,
    label: 'Marketing', 
    color: 'orange' 
  },
  s5: { 
    x: -2000,
    y: 600,
    label: 'Livres', 
    color: 'green' 
  },
  contact: { 
    x: 0,
    y: 900,
    label: 'Contact', 
    color: 'pink' 
  }
};

// ═══════════════════════════════════════════════════════════════
// 📝 POST-ITS ÉPARPILLÉS
// ═══════════════════════════════════════════════════════════════

export const stickyNotes = [
  { x: -650, y: -350, text: "Café ☕", rotation: 12, color: 'yellow' },
  { x: 350, y: -550, text: "🎨 Passion", rotation: -8, color: 'pink' },
  { x: -1000, y: 520, text: "Portfolio 2024", rotation: 5, color: 'yellow' },
  { x: 800, y: 350, text: "💡 Créativité", rotation: -15, color: 'green' },
  { x: -300, y: 750, text: "🚀 Projets", rotation: 8, color: 'orange' },
  { x: 700, y: -170, text: "Design is ❤️", rotation: -5, color: 'pink' }
];

// ═══════════════════════════════════════════════════════════════
// 🎨 ITEMS DU PORTFOLIO
// ═══════════════════════════════════════════════════════════════

export const portfolioItems = {
  s1: [
    { id: 1, title: 'Jazz Festival', description: 'Affiche Montreux 2024', image: '🎺' },
    { id: 2, title: 'Ciné-Club', description: 'Style rétro 70s', image: '🎬' },
    { id: 3, title: 'Théâtre', description: 'Les Misérables', image: '🎭' },
    { id: 4, title: 'Festival Rock', description: 'Concert alternatif', image: '🎸' },
    { id: 5, title: 'Opéra', description: 'Affiche classique', image: '🎼' }
  ],
  s2: [
    { id: 1, title: 'Nature', description: 'Aquarelle botanique', image: '🌿' },
    { id: 2, title: 'Portraits', description: 'Série stylisée', image: '👤' },
    { id: 3, title: 'Animaux', description: 'Bestiaire fantastique', image: '🦊' },
    { id: 4, title: 'Urbain', description: 'Villes françaises', image: '🏛️' }
  ],
  s3: [
    { id: 1, title: 'Urbain', description: 'Acrylique 80x120', image: '🏙️' },
    { id: 2, title: 'Paysages', description: 'Aquarelle A3', image: '🌄' },
    { id: 3, title: 'Abstrait', description: 'Technique mixte', image: '🎨' },
    { id: 4, title: 'Nature Morte', description: 'Huile sur toile', image: '🍎' }
  ],
  s4: [
    { id: 1, title: 'IKEA', description: 'Stratégie créative', image: '🎯' },
    { id: 2, title: 'Branding', description: 'Identité visuelle', image: '✨' },
    { id: 3, title: 'Social Media', description: 'Stratégie contenu', image: '📱' },
    { id: 4, title: 'Packaging', description: 'Design produit', image: '📦' }
  ],
  s5: [
    { id: 1, title: 'Contes', description: 'Livre jeunesse', image: '📚' },
    { id: 2, title: 'Cuisine', description: 'Illustrations food', image: '🍳' },
    { id: 3, title: 'BD', description: 'Roman graphique', image: '📖' },
    { id: 4, title: 'Photo', description: 'Livre photo', image: '📷' },
    { id: 5, title: 'Jeunesse', description: 'Bande dessinée', image: '📕' }
  ]
};

// ═══════════════════════════════════════════════════════════════
// ⚙️ PARAMÈTRES DU TABLEAU
// ═══════════════════════════════════════════════════════════════

export const boardSettings = {
  width: 5500,
  height: 2500,
  
  // ZOOMS (ajustables selon les besoins)
  initialZoom: 0.5,   // Vue globale : voir tout le tableau
  centerZoom: 1.2,     // Vue centre : logo + boutons bien visibles
  sectionZoom: 1.2,    // Vue sections : voir la section + cartes
  
  // Limites zoom manuel (molette)
  zoomMin: 1,
  zoomMax: 3,
  
  // Pas de dragConstraints pour mouvement libre
};

// ═══════════════════════════════════════════════════════════════
// 👤 INFORMATIONS PERSONNELLES
// ═══════════════════════════════════════════════════════════════

export const personalInfo = {
  name: 'Thibaud Pagès',
  subtitle: 'Graphiste & Illustrateur',
  email: 'thibaudpages@yahoo.fr',
  logo: null
};

// ═══════════════════════════════════════════════════════════════
// 🎬 ANIMATION DE CHARGEMENT
// ═══════════════════════════════════════════════════════════════

export const loadingAnimation = {
  minDuration: 2000,
  loadingText: 'Préparation du tableau...',
  transitionStyle: 'zoom'
};