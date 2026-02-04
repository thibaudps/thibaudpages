/* eslint-disable no-unused-vars */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Badge "Print" en forme de macaron/starburst rouge
 * @param {function} onClick - Fonction appelée au clic
 * @param {boolean} isMobile - Adapte la taille pour mobile
 * @param {boolean} inLightbox - Style adapté pour la lightbox
 */
const PrintBadge = ({ onClick, isMobile = false, inLightbox = false }) => {
  
  // 🎯 TAILLES - Change ici pour ajuster
  const sizeConfig = {
    lightboxDesktop: 120,
    lightboxMobile: 140,
    cardMobile: 45,
    cardDesktop: 60
  };
  
  const size = inLightbox 
    ? (isMobile ? sizeConfig.lightboxMobile : sizeConfig.lightboxDesktop)
    : (isMobile ? sizeConfig.cardMobile : sizeConfig.cardDesktop);
  
  // 🎯 POSITIONS - 4 configurations séparées
  const position = {
    lightboxDesktop: { top: '645px', right: '0px' },  // ← Lightbox sur ordi
    lightboxMobile: { top: '500px', right: '-0px' },   // ← Lightbox sur mobile
    cardMobile: { top: '2px', right: '2px' },          // ← Carte mobile
    cardDesktop: { top: '2px', right: '2px' }           // ← Carte desktop
  };
  
  // Sélection de la bonne position
  const currentPosition = inLightbox 
    ? (isMobile ? position.lightboxMobile : position.lightboxDesktop)
    : (isMobile ? position.cardMobile : position.cardDesktop);
  
  // 🎯 IMAGES - Images différentes selon contexte
  const imageSrc = inLightbox 
    ? 'images/onsale-lightbox.svg'  // ← Image pour lightbox
    : 'images/onsale.svg';          // ← Image pour cartes
  
  // 🎯 ANIMATIONS - Configurations séparées
  const animations = {
    // Animation dans la lightbox
    lightbox: {
      base: 0,           // Rotation de base (0° = pas de rotation)
      oscillation: [-1, 1, -0.5, 0.5, 0], // Oscillation autour de la base
      hover: 10          // Rotation supplémentaire au hover
    },
    // Animation sur les cartes
    cards: {
      base: 45,          // Rotation de base (45° incliné)
      oscillation: [-3, 3, -2, 2, 0], // Oscillation autour de 45°
      hover: 10          // Rotation supplémentaire au hover
    }
  };
  
  const currentAnim = inLightbox ? animations.lightbox : animations.cards;
  
  // Calcul des keyframes d'animation
  const rotationKeyframes = [
    currentAnim.base,
    currentAnim.base + currentAnim.oscillation[0],
    currentAnim.base + currentAnim.oscillation[1],
    currentAnim.base + currentAnim.oscillation[2],
    currentAnim.base + currentAnim.oscillation[3],
    currentAnim.base
  ];
  
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: 'absolute',
        top: currentPosition.top,
        right: currentPosition.right,
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
        zIndex: 20,
        background: 'none',
        border: 'none',
        padding: 0
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: currentAnim.base + currentAnim.hover 
      }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotate: rotationKeyframes
      }}
      transition={{
        rotate: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
    >
      {/* Image change selon le contexte */}
      <img 
        src={imageSrc}
        alt="Print disponible"
        style={{ 
          width: '100%', 
          height: '100%',
          filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.4))'
        }}
      />
    </motion.button>
  );
};

export default PrintBadge;