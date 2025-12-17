/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './fonts.css';
import ContactForm from './ContactForm';

const BASE = import.meta.env.BASE_URL;


// ═══════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  boardWidth: 5500,
  boardHeight: 2500,
  centerZoom: 1.2,
  sectionZoom: 1,
  zoomDelay: 500
};

// ═══════════════════════════════════════════════════════════
// SECTION CENTRALE
// ═══════════════════════════════════════════════════════════

const CENTRAL_SECTION = {
  logo: {
    src: `${BASE}images/logocentre.svg`,
    width: '350px',
    alt: 'Thibaud Pages'
  },
  buttons: [
    { id: 's1', src: 'images/boutons/s1.svg', label: 'Affiches' },
    { id: 's2', src: 'images/boutons/s2.svg', label: 'Illustrations' },
    { id: 's3', src: 'images/boutons/s3.svg', label: 'Peintures' },
    { id: 's4', src: 'images/boutons/s4.svg', label: 'Marketing' },
    { id: 's5', src: 'images/boutons/s5.svg', label: 'Livres' },
    { id: 'contact', src: 'images/boutons/contact.svg', label: 'Contact' }
  ]
};

// ═══════════════════════════════════════════════════════════
// SECTIONS - Positions relatives au centre (0,0)
// ratio: 'portrait' (2/3), 'landscape' (3/2), 'square' (1/1)
// ═══════════════════════════════════════════════════════════

const SECTIONS = [
  {
    id: 's1',
    relativePosition: { x: -900, y: -700 },
    title: { src: 'images/sections/s1.svg', alt: 'Affiches', width: '350px' },
    cards: [
      { title: 'Le Petit Nicolas', description: 'Affiche pour le spectacle des Ateliers Buissoniers', image: 'images/portfolio/petitnicolas.png', ratio: 'portrait' },
      { title: 'Alice', description: 'Affiche pour le spectacle des Ateliers Buissoniers', image: 'images/portfolio/alice.jpg', ratio: 'portrait' },
      { title: 'Corgis de Genève', description: 'Affiche pour la parade annuelle des Corgis de Genève', image: 'images/portfolio/corgis.png', ratio: 'portrait' },
      { title: 'La Troublante Histoire du Rouge de ses Yeux', description: 'Affiche pour le film de Giovanni Lulendo Munsungai', image: 'images/portfolio/troublante.png', ratio: 'portrait' },
      { title: 'L\'Homme du Lac', description: 'Cover de l\'album de l\'Homme du Lac ', image: 'images/portfolio/hdl.png', ratio: 'square' },
      { title: 'Clé de Sol', description: 'Affiche pour l\'ouverture d\'un magasin de musique', image: 'images/portfolio/cledesol.png', ratio: 'portrait' },
    ],
    gridCols: 3
  },
  {
    id: 's2',
    relativePosition: { x: 1100, y: -700 },
    title: { src: 'images/sections/s2.svg', alt: 'Illustrations', width: '350px' },
    cards: [
      { title: 'Alien M. Bablet', description: 'Encre et peinture numérique dans le styel de M. Bablet', image: 'images/portfolio/bablet.jpg', ratio: 'portrait' },
      { title: 'Alien K. Haring', description: 'Illustration numérique dans le style de K. Haring', image: 'images/portfolio/keith.jpg', ratio: 'portrait' },
      { title: 'Alien A. Mucha', description: 'Illustration numérique dans le style de Alphonse Mucha', image: 'images/portfolio/mucha.jpg', ratio: 'portrait' },
      { title: 'Juliette, Gaston et Achille', description: 'Character design pour un jeu vidéo', image: 'images/portfolio/juliette.jpg', ratio: 'landscape' },
      { title: 'Le skatepark de Juliette', description: 'Décor pour un jeu vidéo', image: 'images/portfolio/skatepark.jpg', ratio: 'landscape' },
    ],
    gridCols: 3
  },
  {
    id: 's3',
    relativePosition: { x: 2000, y: 0 },
    title: { src: 'images/sections/s3.svg', alt: 'Peintures', width: '350px' },
    cards: [
      { title: 'Ma Maison dans la Forêt', description: 'Peinture à l\'acrylique', image: 'images/portfolio/maisonforet.png', ratio: 'portrait' },
      { title: 'La Grenouille du Chill', description: 'Peinture à l\'acrylique', image: 'images/portfolio/grenouillechill.png', ratio: 'portrait' },
      { title: 'La Fille du LAc', description: 'Peinture à l\'acrylique', image: 'images/portfolio/filledulac.png', ratio: 'portrait' },
      { title: 'Mon Gentil Monstre', description: 'Peinture à l\'aquarelle', image: 'images/portfolio/monstregentil.jpg', ratio: 'portrait' },
    ],
    gridCols: 3
  },
  {
    id: 's4',
    relativePosition: { x: 1000, y: 600 },
    title: { src: 'images/sections/s4.svg', alt: 'Marketing', width: '350px' },
    cards: [
      { title: 'Lunawave Retreats', description: 'Logo design pour Lunawave Retreats', image: 'images/portfolio/lunawave.png', ratio: 'square' },
      { title: 'La Sargane', description: 'Logo design pour La Sargane', image: 'images/portfolio/sargane.png', ratio: 'portrait' },
      { title: 'Dog & Bio', description: 'Packaging pour la marque Dog & Bio', image: 'images/portfolio/dogbio.png', ratio: 'portrait' },
    ],
    gridCols: 3
  },
  {
    id: 's5',
    relativePosition: { x: -1800, y: 100 },
    title: { src: 'images/sections/s5.svg', alt: 'Livres', width: '350px' },
    cards: [
      { title: 'BD Fruits et Légumes', description: 'Planche réalisée pour promouvoir les fruits et légumes de saison', image: 'images/portfolio/bdlegumes.jpg', ratio: 'portrait' },
      { title: 'Coccinelle, Demoiselle', description: 'Illustration de comptine', image: 'images/portfolio/cox.png', ratio: 'landscape' },
      { title: 'Hopi dans son Jardin', description: 'Couverture d\'imagier pour enfants', image: 'images/portfolio/hopicover.png', ratio: 'square' },
      { title: 'Hopi dans son Jardin', description: 'Imagier pour enfants', image: 'images/portfolio/hopip1.png', ratio: 'landscape' },
    ],
    gridCols: 3
  },
  {
    id: 'contact',
    relativePosition: { x: -600, y: 700 },
    title: {},
    cards: [] // Pas de cartes pour contact - utilise le formulaire
  }
];

// ═══════════════════════════════════════════════════════════
// CONVERSION : Position relative → Pixels absolus
// ═══════════════════════════════════════════════════════════

const getAbsolutePosition = (relativePos) => {
  const centerX = CONFIG.boardWidth / 2;  // 2750
  const centerY = CONFIG.boardHeight / 2; // 1250
  return {
    left: centerX + relativePos.x,
    top: centerY + relativePos.y
  };
};

// ═══════════════════════════════════════════════════════════
// HELPER : Dimensions des cartes selon ratio
// Les cartes s'adaptent en largeur ET hauteur au ratio
// ═══════════════════════════════════════════════════════════

const getCardDimensions = (ratio) => {
  const baseSize = 240; // Taille de référence
  
  switch(ratio) {
    case 'portrait':
      // Format A4 portrait (environ 0.707 de ratio largeur/hauteur)
      return { 
        width: baseSize * 0.71, 
        imageHeight: baseSize 
      };
    case 'landscape':
      // Format A4 paysage (environ 1.41 de ratio largeur/hauteur)
      return { 
        width: baseSize * 1.41, 
        imageHeight: baseSize 
      };
    case 'square':
      // Format carré
      return { 
        width: baseSize, 
        imageHeight: baseSize 
      };
    default:
      return { 
        width: baseSize, 
        imageHeight: baseSize 
      };
  }
};

// ═══════════════════════════════════════════════════════════
// COMPOSANT
// ═══════════════════════════════════════════════════════════

const CorkBoard = () => {
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Calcul du zoom initial IMMÉDIATEMENT lors de l'initialisation
  const [zoom, setZoom] = useState(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scaleWidth = viewportWidth / CONFIG.boardWidth;
    const scaleHeight = viewportHeight / CONFIG.boardHeight;
    return Math.min(scaleWidth, scaleHeight) * 0.95;
  });
  
  const [initialZoom, setInitialZoom] = useState(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scaleWidth = viewportWidth / CONFIG.boardWidth;
    const scaleHeight = viewportHeight / CONFIG.boardHeight;
    return Math.min(scaleWidth, scaleHeight) * 0.95;
  });
  
  const [lightboxImage, setLightboxImage] = useState(null);

  

  // ═══════════════════════════════════════════════════════════
  // GÉNÉRER LES VARIATIONS ALÉATOIRES UNE SEULE FOIS
  // ═══════════════════════════════════════════════════════════
  const cardVariations = useMemo(() => {
    const variations = {};
    SECTIONS.forEach(section => {
      variations[section.id] = section.cards.map(() => ({
        // Variations pour la punaise
        pinRotation: (Math.random() - 0.5) * 40,
        pinX: (Math.random() - 0.5) * 10,
        pinY: (Math.random() - 0.5) * 6,
        // Variations pour la carte
        cardRotation: (Math.random() - 0.5) * 4,
        cardY: (Math.random() - 0.5) * 12,
        cardX: (Math.random() - 0.5) * 8
      }));
    });
    return variations;
  }, []); // Le tableau vide [] = calculer une seule fois au montage
  
  // Recalcul du zoom uniquement au resize
  useEffect(() => {
    const calculateInitialZoom = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const scaleWidth = viewportWidth / CONFIG.boardWidth;
      const scaleHeight = viewportHeight / CONFIG.boardHeight;
      
      const calculatedZoom = Math.min(scaleWidth, scaleHeight) * 0.95;
      
      console.log("📐 Viewport:", viewportWidth, "x", viewportHeight);
      console.log("📐 Board:", CONFIG.boardWidth, "x", CONFIG.boardHeight);
      console.log("🔎 Zoom calculé:", calculatedZoom);
      
      setInitialZoom(calculatedZoom);
      setZoom(calculatedZoom);
    };
    
    // Seulement écouter le resize, pas au mount initial
    window.addEventListener('resize', calculateInitialZoom);
    
    return () => window.removeEventListener('resize', calculateInitialZoom);
  }, []);
  
  // Animation zoom vers centre - PROGRESSIVE
  useEffect(() => {
    if (initialZoom === 1) return;
    
    const timer = setTimeout(() => {
      console.log("✨ Zoom progressif vers centre");
      setZoom(CONFIG.centerZoom);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [initialZoom]);
  
  // Navigation vers section
  const navigateToSection = (sectionId) => {
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section) return;
    
    console.log("\n🎯 Navigation:", section.title.alt);
    console.log("📍 Position relative:", section.relativePosition);
    console.log("✅ Déplacement:", { x: -section.relativePosition.x, y: -section.relativePosition.y });
    
    setPosition({ 
      x: -section.relativePosition.x, 
      y: -section.relativePosition.y 
    });
    setZoom(CONFIG.sectionZoom);
  };
  
  // Retour centre
  const returnToCenter = () => {
    console.log("Retour centre");
    setPosition({ x: 0, y: 0 });
    setZoom(CONFIG.centerZoom);
  };
  
  // Zoom molette
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setZoom(prev => Math.max(initialZoom * 0.95, Math.min(1.2, prev + delta)));
  };
  
  // Ouvrir lightbox
  const openLightbox = (card) => {
    if (card.image) {
      setLightboxImage(card);
    }
  };
  
  const isAtCenter = position.x === 0 && position.y === 0;
  
  return (
    <div 
      className="w-full h-screen overflow-hidden relative bg-gray-900"
      onWheel={handleWheel}
    >
      
      {/* Container flex pour centrer le board */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Layer Zoom */}
        <motion.div
          animate={{ scale: zoom }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8
          }}
          style={{
            transformOrigin: 'center center'
          }}
        >
          
          {/* Board 5500x2500 avec translate pour navigation */}
          <motion.div
            animate={{ x: position.x, y: position.y }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 2
            }}
            style={{
              width: `${CONFIG.boardWidth}px`,
              height: `${CONFIG.boardHeight}px`,
              position: 'relative'
            }}
          >
            
            {/* Background corkboard */}
            <img 
              src="images/corkboard.svg" 
              alt="Cork Board"
              style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
              }}
            />
            
            {/* Section centrale - Centre du board (2750, 1250) */}
            <motion.div 
              className="absolute"
              style={{ 
                left: `${CONFIG.boardWidth / 2}px`,
                top: `${CONFIG.boardHeight / 2}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
              animate={{ 
                opacity: isAtCenter ? 1 : 0,
                pointerEvents: isAtCenter ? 'auto' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              
              {/* Logo avec animation de balancement */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, -1.5, 1.5, -0.75, 0.75, 0]
                }}
                transition={{ 
                  delay: 1.2,
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
                style={{ transformOrigin: 'top center' }}
                className="flex items-center justify-center mb-8"
              >
                <img 
                  src={CENTRAL_SECTION.logo.src}
                  alt={CENTRAL_SECTION.logo.alt}
                  style={{ width: CENTRAL_SECTION.logo.width }}
                  className="drop-shadow-lg"
                />
              </motion.div>
              
              {/* Boutons */}
              <div className="flex flex-wrap justify-center gap-3 max-w-xl">
                {CENTRAL_SECTION.buttons.map((btn, idx) => (
                  <motion.button
                    key={btn.id}
                    onClick={() => navigateToSection(btn.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transformOrigin: 'top center'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: [
                        (idx % 2 ? -1 : 1) * (idx + 1),
                        (idx % 2 ? -1 : 1) * (idx + 1) - 2,
                        (idx % 2 ? -1 : 1) * (idx + 1) + 2,
                        (idx % 2 ? -1 : 1) * (idx + 1)
                      ]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0 + idx * 0.1 },
                      y: { duration: 0.5, delay: 0 + idx * 0.1 },
                      rotate: {
                        duration: 3 + idx * 0.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1.5 + idx * 0.2
                      }
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.04, 
                      rotate: 2,
                      transition: { 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 10 
                      }
                    }}
                    whileTap={{ 
                      scale: 1.18, 
                      rotate: 2,
                      transition: { 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 20 
                      }
                    }}
                  >
                    <img 
                      src={btn.src}
                      alt={btn.label}
                      style={{ width: '150px', height: '120px' }}
                    />
                  </motion.button>
                ))}
              </div>
              
            </motion.div>
            
{/* Sections portfolio - Positions en PIXELS ABSOLUS */}
{SECTIONS.map((section) => {
  const absPos = getAbsolutePosition(section.relativePosition);
  
  return (
    <div
      key={section.id}
      className="absolute"
      style={{
        left: `${absPos.left}px`,
        top: `${absPos.top}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 3
      }}
    >
      
      {/* CONDITION : Structure différente pour la section contact */}
      {section.id === 'contact' ? (
        <div className="relative flex items-start justify-center gap-6">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
          
          {/* Bouton retour positionné en haut à droite du formulaire */}
          <motion.button
            onClick={returnToCenter}
            style={{ 
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transformOrigin: 'center 10%',
              marginTop: '0px',
              position: 'absolute',
              left: 'calc(50% + 100px)',
              zIndex: 100,           
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              rotate: [0, -2, 2, -1, 1, 0]
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotate: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.3
              }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 10 
              }
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: -5,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 20 
              }
            }}
          >
            <img 
              src="images/retouraucentre.svg"
              alt="Retour au centre"
              style={{ width: '120px', height: 'auto' }}
            />
          </motion.button>
        </div>
      ) : (
        /* Structure normale pour les autres sections (avec titre) */
        <>
          {/* Container pour titre et bouton retour */}
          <div className="mb-6 flex justify-center items-start gap-6">
            
            {/* Titre de section avec animation */}
            <motion.div
              style={{ perspective: 1500 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1,
                x: [0, 2, 0, 3, 0], 
                y: [0, 5, 1, 4, 0],
                rotateX: [0, -10, -2, -8, 0]
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { duration: 0.5 },
                rotateX: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
              style={{ 
                transformOrigin: 'center 45%',
                transformStyle: 'preserve-3d'
              }}
            >
              <img 
                src={section.title.src}
                alt={section.title.alt}
                style={{ width: section.title.width, height: 'auto' }}
              />
            </motion.div>
            
            {/* Bouton retour avec oscillation indépendante */}
            <motion.button
              onClick={returnToCenter}
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transformOrigin: 'center 20%',
                marginTop: '10px',
                position: 'absolute',  
                left: 'calc(50% + 200px)', 
                top: '10px',              
                zIndex: 10
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, -1, 1, 0]
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.3
                }
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 10 
                }
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: -5,
                transition: { 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 20 
                }
              }}
            >
              <img 
                src="images/retouraucentre.svg"
                alt="Retour au centre"
                style={{ width: '120px', height: 'auto' }}
              />
            </motion.button>
            
          </div>
          
          {/* Grille de cartes */}
          <div className="flex flex-wrap justify-center gap-4">
            {section.cards.map((card, idx) => {
              const dimensions = getCardDimensions(card.ratio);
              const variations = cardVariations[section.id][idx];
              
              return (
                <motion.div
                  key={idx}
                  className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gray-800 cursor-pointer flex flex-col relative"
                  style={{ 
                    width: `${dimensions.width}px`,
                    transform: `translateY(${variations.cardY}px) translateX(${variations.cardX}px) rotate(${variations.cardRotation}deg)`,
                    transformOrigin: 'center 10%'
                  }}
                  initial={{ opacity: 0, y: 30, x: 0 }}
                  animate={{ 
                    opacity: 1,
                    y: variations.cardY,
                    x: variations.cardX,
                    rotate: [
                      variations.cardRotation,
                      variations.cardRotation + (idx % 2 ? -1 : 1) * (idx + 1) * 0.15,
                      variations.cardRotation + (idx % 2 ? 1 : -1) * (idx + 1) * 0.2,
                      variations.cardRotation + (idx % 2 ? -1 : 1) * (idx + 1) * 0.1,
                      variations.cardRotation + (idx % 2 ? 1 : -1) * (idx + 1) * 0.1,
                    ]
                  }}
                  transition={{
                    opacity: { delay: idx * 0.1, duration: 0.5 },
                    y: { delay: idx * 0.1, duration: 0.5 },
                    x: { delay: idx * 0.1, duration: 0.5 },
                    rotate: {
                      delay: idx * 0.1 + 0.5,
                      duration: 3.5 + idx * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  onClick={() => openLightbox(card)}
                >
                  <img 
                    src="images/punaises.svg"
                    alt="Punaise"
                    style={{
                      position: 'absolute',
                      top: `${-4 + variations.pinY}px`,
                      left: `calc(50% + ${variations.pinX}px)`,
                      transform: `translate(-50%, 0) rotate(${variations.pinRotation}deg)`,
                      width: '30px',
                      height: 'auto',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  />
                  
                  <div 
                    className="relative bg-white border-b-2 border-gray-800 flex items-center justify-center overflow-hidden flex-grow"
                  >
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover"
                        style={{ display: 'block' }}
                      />
                    ) : (
                      <div className="text-gray-300 text-sm text-center px-4">
                        [Image à venir]
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-yellow-50 flex-shrink-0" style={{ fontFamily: 'MyFont, sans-serif' }}>
                    <h3 className="font-bold text-sm mb-1 text-gray-800">{card.title}</h3>
                    <p className="text-xs text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
      
    </div>
  );
})}
            
          </motion.div>
          
        </motion.div>
        
      </div>
      
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Bouton fermer */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-4 -right-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold w-10 h-10 rounded-full shadow-lg border-2 border-gray-800 flex items-center justify-center"
              >
                ✕
              </button>
              
              {/* Info */}
              <div className="absolute -bottom-20 left-0 right-0 text-center text-white" style={{ fontFamily: 'myfont, sans-serif' }}>
                <h3 className="font-bold text-xl mb-1">{lightboxImage.title}</h3>
                <p className="text-sm text-gray-300">{lightboxImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default CorkBoard;
