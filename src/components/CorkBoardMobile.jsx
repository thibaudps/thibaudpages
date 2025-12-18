/* eslint-disable no-unused-vars */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './fonts.css';

const BASE = import.meta.env.BASE_URL;

// ═══════════════════════════════════════════════════════════
// CONFIGURATION MOBILE
// ═══════════════════════════════════════════════════════════

const SECTIONS_DATA = [
  {
    id: 's1',
    title: { src: 'images/sections/s1.svg', alt: 'Affiches' },
    cards: [
      { title: 'Le Petit Nicolas', description: 'Affiche pour le spectacle des Ateliers Buissoniers', image: 'images/portfolio/petitnicolas.png' },
      { title: 'Alice', description: 'Affiche pour le spectacle des Ateliers Buissoniers', image: 'images/portfolio/alice.jpg' },
      { title: 'Corgis de Genève', description: 'Affiche pour la parade annuelle des Corgis de Genève', image: 'images/portfolio/corgis.png' },
      { title: 'La Troublante Histoire du Rouge de ses Yeux', description: 'Affiche pour le film de Giovanni Lulendo Munsungai', image: 'images/portfolio/troublante.png' },
      { title: 'L\'Homme du Lac', description: 'Cover de l\'album de l\'Homme du Lac', image: 'images/portfolio/hdl.png' },
      { title: 'Clé de Sol', description: 'Affiche pour l\'ouverture d\'un magasin de musique', image: 'images/portfolio/cledesol.png' },
    ]
  },
  {
    id: 's2',
    title: { src: 'images/sections/s2.svg', alt: 'Illustrations' },
    cards: [
      { title: 'Alien M. Bablet', description: 'Encre et peinture numérique dans le style de M. Bablet', image: 'images/portfolio/bablet.jpg' },
      { title: 'Alien K. Haring', description: 'Illustration numérique dans le style de K. Haring', image: 'images/portfolio/keith.jpg' },
      { title: 'Alien A. Mucha', description: 'Illustration numérique dans le style de Alphonse Mucha', image: 'images/portfolio/mucha.png' },
      { title: 'Juliette, Gaston et Achille', description: 'Character design pour un jeu vidéo', image: 'images/portfolio/juliette.jpg' },
      { title: 'Le skatepark de Juliette', description: 'Décor pour un jeu vidéo', image: 'images/portfolio/skatepark.jpg' },
    ]
  },
  {
    id: 's3',
    title: { src: 'images/sections/s3.svg', alt: 'Peintures' },
    cards: [
      { title: 'Ma Maison dans la Forêt', description: 'Peinture à l\'acrylique', image: 'images/portfolio/maisonforet.png' },
      { title: 'La Grenouille du Chill', description: 'Peinture à l\'acrylique', image: 'images/portfolio/grenouillechill.png' },
      { title: 'La Fille du LAc', description: 'Peinture à l\'acrylique', image: 'images/portfolio/filledulac.png' },
      { title: 'Mon Gentil Monstre', description: 'Peinture à l\'aquarelle', image: 'images/portfolio/monstregentil.jpg' },
    ]
  },
  {
    id: 's4',
    title: { src: 'images/sections/s4.svg', alt: 'Marketing' },
    cards: [
      { title: 'Lunawave Retreats', description: 'Logo design pour Lunawave Retreats', image: 'images/portfolio/lunawave.png' },
      { title: 'La Sargane', description: 'Logo design pour La Sargane', image: 'images/portfolio/sargane.png' },
      { title: 'Dog & Bio', description: 'Packaging pour la marque Dog & Bio', image: 'images/portfolio/dogbio.png' },
    ]
  },
  {
    id: 's5',
    title: { src: 'images/sections/s5.svg', alt: 'Livres' },
    cards: [
      { title: 'BD Fruits et Légumes', description: 'Planche réalisée pour promouvoir les fruits et légumes de saison', image: 'images/portfolio/bdlegumes.jpg' },
      { title: 'Coccinelle, Demoiselle', description: 'Illustration de comptine', image: 'images/portfolio/cox.png' },
      { title: 'Hopi dans son Jardin', description: 'Couverture d\'imagier pour enfants', image: 'images/portfolio/hopicover.png' },
      { title: 'Hopi dans son Jardin', description: 'Imagier pour enfants', image: 'images/portfolio/hopip1.png' },
    ]
  }
];

const NAVIGATION_BUTTONS = [
  { id: 's1', src: 'images/boutons/s1.svg', label: 'Affiches' },
  { id: 's2', src: 'images/boutons/s2.svg', label: 'Illustrations' },
  { id: 's3', src: 'images/boutons/s3.svg', label: 'Peintures' },
  { id: 's4', src: 'images/boutons/s4.svg', label: 'Marketing' },
  { id: 's5', src: 'images/boutons/s5.svg', label: 'Livres' },
  { id: 'contact', src: 'images/boutons/contact.svg', label: 'Contact' }
];

// ═══════════════════════════════════════════════════════════
// COMPOSANT MOBILE
// ═══════════════════════════════════════════════════════════

const CorkBoardMobile = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRefs = useRef({});
  const containerRef = useRef(null);

  // Détecter le scroll pour afficher le bouton "retour en haut"
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowBackToTop(container.scrollTop > 500);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour scroller vers une section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fonction pour retourner en haut
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openLightbox = (card) => {
    setLightboxImage(card);
  };

  return (
    <>
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundImage: 'url("images/corkboardweb.svg")',
          backgroundSize: '150%',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-y',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            SECTION HEADER - Logo + Navigation
        ═══════════════════════════════════════════════════════════ */}
        <div 
          ref={el => sectionRefs.current['top'] = el}
          style={{ padding: '20px 16px' }}
        >
          {/* Logo */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="images/logocentre.svg"
              alt="Thibaud Pages"
              style={{ width: '350px', maxWidth: '70vw', display: 'block' }}
            />
          </motion.div>

          {/* Grille de boutons 3×2 */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '4px',
              maxWidth: '300px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {NAVIGATION_BUTTONS.map((button, idx) => (
              <motion.button
                key={button.id}
                onClick={() => scrollToSection(button.id)}
                style={{
                  aspectRatio: '1',
                  padding: '2px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={button.src}
                  alt={button.label}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTIONS PORTFOLIO
        ═══════════════════════════════════════════════════════════ */}
        {SECTIONS_DATA.map((section) => (
          <div 
            key={section.id}
            ref={el => sectionRefs.current[section.id] = el}
            style={{ padding: '48px 16px' }}
          >
            {/* Titre de section */}
            <motion.div
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={section.title.src}
                alt={section.title.alt}
                style={{ width: '180px', maxWidth: '65vw', display: 'block' }}
              />
            </motion.div>

            {/* Grille de cartes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              maxWidth: '280px',
              margin: '0 auto',
              padding: '0 8px'
            }}>
              {section.cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    border: '2px solid #1f2937',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => openLightbox(card)}
                >
                  {/* Punaise */}
                  <img 
                    src="images/punaises.svg"
                    alt="Punaise"
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: 'auto',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  />
                  
                  {/* Image */}
                  <div style={{
                    position: 'relative',
                    background: 'white',
                    borderBottom: '2px solid #1f2937',
                    overflow: 'hidden',
                    aspectRatio: '3/4'
                  }}>
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        loading="lazy"
                        onLoad={(e) => e.target.style.opacity = 1}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          display: 'block',
                          opacity: 0,
                          transition: 'opacity 0.3s'
                        }}
                      />
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#d1d5db',
                        fontSize: '12px'
                      }}>
                        [Image à venir]
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div style={{
                    padding: '6px',
                    background: '#fefce8',
                    fontFamily: 'MyFont, sans-serif'
                  }}>
                    <h3 style={{
                      fontWeight: 'bold',
                      fontSize: '10px',
                      marginBottom: '2px',
                      color: '#1f2937',
                      lineHeight: '1.2'
                    }}>{card.title}</h3>
                    <p style={{
                      fontSize: '8px',
                      color: '#4b5563',
                      lineHeight: '1.2',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* ═══════════════════════════════════════════════════════════
            SECTION CONTACT
        ═══════════════════════════════════════════════════════════ */}
        <div 
          ref={el => sectionRefs.current['contact'] = el}
          style={{ padding: '48px 16px' }}
        >
          <motion.div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '470px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="images/contact-form.svg"
              alt="Formulaire de contact"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Message envoyé ! (Version démo)');
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                fontFamily: 'MyFont, sans-serif'
              }}
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Votre nom"
                style={{
                  position: 'absolute',
                  left: '35%',
                  top: '26.5%',
                  width: '42%',
                  height: '4%',
                  background: 'transparent',
                  border: 'none',
                  padding: '0 8px',
                  fontSize: '13px',
                  color: '#2d2d2d',
                  outline: 'none'
                }}
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Votre email"
                style={{
                  position: 'absolute',
                  left: '36%',
                  top: '33%',
                  width: '42%',
                  height: '4%',
                  background: 'transparent',
                  border: 'none',
                  padding: '0 8px',
                  fontSize: '13px',
                  color: '#2d2d2d',
                  outline: 'none'
                }}
              />

              <textarea
                name="message"
                required
                placeholder="Votre message"
                style={{
                  position: 'absolute',
                  left: '37%',
                  top: '40%',
                  width: '42%',
                  height: '31%',
                  background: 'transparent',
                  border: 'none',
                  padding: '8px',
                  fontSize: '13px',
                  color: '#2d2d2d',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'MyFont, sans-serif'
                }}
              />

              <button
                type="submit"
                style={{
                  position: 'absolute',
                  left: '62%',
                  top: '73.5%',
                  width: '21%',
                  height: '6%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                aria-label="Envoyer le message"
              />
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#374151', fontFamily: 'MyFont, sans-serif' }}>
          <p style={{ fontSize: '14px' }}>© 2024 Thibaud Pagès</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Graphiste & Illustrateur</p>
        </div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.9)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                style={{ position: 'relative', width: '100%', maxWidth: '512px' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}
                />
                
                <button
                  onClick={() => setLightboxImage(null)}
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '-12px',
                    background: '#fbbf24',
                    color: '#1f2937',
                    fontWeight: 'bold',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    border: '2px solid #1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  ✕
                </button>
                
                <div style={{ marginTop: '16px', textAlign: 'center', color: 'white', fontFamily: 'MyFont, sans-serif' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>{lightboxImage.title}</h3>
                  <p style={{ fontSize: '14px', color: '#d1d5db' }}>{lightboxImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bouton retour en haut - SORTI DU CONTENEUR */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '16px',
              right: '16px',
              width: '64px',
              height: '64px',
              zIndex: 9999,
              padding: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <img 
              src="images/retouraucentre.svg"
              alt="Retour en haut"
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default CorkBoardMobile;