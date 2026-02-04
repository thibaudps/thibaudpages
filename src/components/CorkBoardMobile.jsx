/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './fonts.css';
import { SECTIONS_DATA, NAVIGATION_BUTTONS } from '../portfolioConfig';
import PrintModal from './PrintModal';
import PrintBadge from './PrintBadge';

const BASE = import.meta.env.BASE_URL;

// ═══════════════════════════════════════════════════════════
// UTILITAIRE : Rotation aléatoire
// ═══════════════════════════════════════════════════════════
const getRandomRotation = () => Math.random() * 4 - 2;

// ═══════════════════════════════════════════════════════════
// COMPOSANT MOBILE
// ═══════════════════════════════════════════════════════════

const CorkBoardMobile = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [printModalCard, setPrintModalCard] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const sectionRefs = useRef({});
  const containerRef = useRef(null);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(0);

  // Détecter le scroll et calculer la vélocité
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime.current;
      
      if (timeDelta > 0) {
        const scrollDelta = currentScrollTop - lastScrollTop.current;
        const velocity = scrollDelta / timeDelta;
        setScrollVelocity(velocity * 10);
      }
      
      lastScrollTop.current = currentScrollTop;
      lastScrollTime.current = currentTime;
      setShowBackToTop(currentScrollTop > 500);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    const container = containerRef.current;
    
    if (element && container) {
      const elementTop = element.offsetTop;
      const offset = sectionId === 'contact' ? -80 : 0;
      
      container.scrollTo({
        top: elementTop + offset,
        behavior: 'smooth'
      });
    }
  };

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
        {/* SECTION HEADER */}
        <div 
          ref={el => sectionRefs.current['top'] = el}
          style={{ padding: '20px 16px' }}
        >
          <motion.div
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '16px',
              transformOrigin: 'top center'
            }}
            initial={{ opacity: 0, y: -20, rotate: getRandomRotation() }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: getRandomRotation() + scrollVelocity * 0.5
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { duration: 0.6 },
              rotate: { type: "spring", stiffness: 100, damping: 10 }
            }}
          >
            <img 
              src="images/logocentre.svg"
              alt="Thibaud Pages"
              style={{ width: '350px', maxWidth: '70vw', display: 'block' }}
            />
          </motion.div>

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
            {NAVIGATION_BUTTONS.map((button, idx) => {
              const randomRotation = getRandomRotation();
              return (
                <motion.button
                  key={button.id}
                  onClick={() => scrollToSection(button.id)}
                  style={{
                    aspectRatio: '1',
                    padding: '2px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transformOrigin: 'top center'
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotate: randomRotation }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: randomRotation + scrollVelocity * 0.3
                  }}
                  transition={{ 
                    delay: 0.4 + idx * 0.1,
                    rotate: { type: "spring", stiffness: 100, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={button.src}
                    alt={button.label}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* SECTIONS PORTFOLIO */}
        {SECTIONS_DATA.map((section) => (
          <div 
            key={section.id}
            ref={el => sectionRefs.current[section.id] = el}
            style={{ padding: '48px 16px' }}
          >
            <motion.div
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '32px',
                transformOrigin: 'top center'
              }}
              initial={{ opacity: 0, y: 30, rotateX: 8 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                rotateX: 8 + scrollVelocity * 0.8
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                rotateX: { type: "spring", stiffness: 80, damping: 12 }
              }}
            >
              <img 
                src={section.title.src}
                alt={section.title.alt}
                style={{ width: '180px', maxWidth: '65vw', display: 'block' }}
              />
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              maxWidth: '280px',
              margin: '0 auto',
              padding: '0 8px'
            }}>
              {section.cards.map((card, idx) => {
                const randomRotation = getRandomRotation();
                return (
                  <motion.div
                    key={idx}
                    style={{
                      background: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
                      overflow: 'visible',
                      border: '2px solid #1f2937',
                      position: 'relative',
                      cursor: 'pointer',
                      transformOrigin: 'top center'
                    }}
                    initial={{ opacity: 0, y: 30, rotate: randomRotation }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      rotate: randomRotation + scrollVelocity * 0.4
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: idx * 0.1, 
                      duration: 0.5,
                      rotate: { type: "spring", stiffness: 100, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
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

                    {/* Badge Print - Composant centralisé */}
                    {card.printAvailable && (
                      <PrintBadge 
                        onClick={() => setPrintModalCard(card)}
                        isMobile={true}
                      />
                    )}
                    
                    {/* Container de l'image */}
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
                          draggable="false"
                          onContextMenu={(e) => e.preventDefault()}
                          onLoad={(e) => e.target.style.opacity = 1}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            display: 'block',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            pointerEvents: 'none'
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
                );
              })}
            </div>
          </div>
        ))}

        {/* SECTION CONTACT */}
        <div 
          ref={el => sectionRefs.current['contact'] = el}
          style={{ padding: '48px 16px' }}
        >
          <motion.div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '470px',
              margin: '0 auto',
              transformOrigin: 'top center'
            }}
            initial={{ opacity: 0, scale: 0.9, rotateX: 8 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              rotateX: 8 + scrollVelocity * 0.8
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              rotateX: { type: "spring", stiffness: 80, damping: 12 }
            }}
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
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
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
                {/* Badge Print dans la Lightbox */}
                {lightboxImage.printAvailable && (
                  <PrintBadge 
                    isMobile={true}        // ← AJOUT : force mobile
                    inLightbox={true}
                    onClick={() => {
                      setLightboxImage(null);
                      setPrintModalCard(lightboxImage);
                    }}
                  />
                )}
                
                <img 
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ 
                    width: '100%',
                    maxHeight: '70vh',        // ← AJOUT : limite la hauteur
                    objectFit: 'contain',     // ← AJOUT : garde le ratio
                    borderRadius: '8px', 
                    boxShadow: '0 20px 25px rgba(0,0,0,0.5)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none'
  }}
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
                
                <div style={{ marginTop: '16px', textAlign: 'left', color: 'white', fontFamily: 'MyFont, sans-serif' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>{lightboxImage.title}</h3>
                  <p style={{ fontSize: '14px', color: '#d1d5db' }}>{lightboxImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DE COMMANDE */}
        <AnimatePresence>
          {printModalCard && (
            <PrintModal 
              card={printModalCard} 
              onClose={() => setPrintModalCard(null)} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bouton retour en haut - Caché si lightbox ouverte */}
      <AnimatePresence>
        {showBackToTop && !lightboxImage && !printModalCard && (  // ← AJOUT : && !lightboxImage
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
              cursor: 'pointer',
              transformOrigin: 'top center'
            }}
            initial={{ opacity: 0, scale: 0, rotate: getRandomRotation() }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: getRandomRotation() + scrollVelocity * 0.3
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              rotate: { type: "spring", stiffness: 100, damping: 10 }
            }}
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