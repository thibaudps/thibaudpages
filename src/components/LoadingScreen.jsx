import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const startTime = Date.now(); // Enregistre l'heure de début

    // Liste des images critiques à précharger
    const criticalImages = [
      // Logo
      'images/logocentre.svg',
      
      // Boutons de navigation
      'images/boutons/s1.svg',
      'images/boutons/s2.svg',
      'images/boutons/s3.svg',
      'images/boutons/s4.svg',
      'images/boutons/s5.svg',
      'images/boutons/contact.svg',
      
      // Titres de sections
      'images/sections/s1.svg',
      'images/sections/s2.svg',
      'images/sections/s3.svg',
      'images/sections/s4.svg',
      'images/sections/s5.svg',
      
      // Background (adapté selon mobile/desktop)
      isMobile ? 'images/corkboardweb.svg' : 'images/corkboard.svg',
      
      // Bouton retour
      'images/retouraucentre.svg',
      
      // Punaises
      'images/punaises.svg',
      
      // Formulaire contact
      'images/contact-form.svg',
      
      // Premières images de portfolio (les plus visibles)
      'images/portfolio/petitnicolas.png',
      'images/portfolio/alice.jpg',
      'images/portfolio/corgis.png',
      'images/portfolio/troublante.png',
    ];

    let loadedCount = 0;
    const totalImages = criticalImages.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = () => {
          // En cas d'erreur, on continue quand même
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    // Précharger toutes les images
    Promise.all(criticalImages.map(preloadImage)).then(() => {
      const elapsedTime = Date.now() - startTime;
      const minimumLoadTime = 3000; // 3 secondes minimum
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

      // Attendre le temps restant pour atteindre 3 secondes minimum
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onLoadComplete();
        }, 500); // Délai pour l'animation de sortie
      }, remainingTime);
    });
  }, [onLoadComplete, isMobile]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#F8F0E4', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          {/* GIF de loading */}
          <motion.img
  src="images/loading.gif"
  alt=""
  style={{
    maxWidth: isMobile ? '150vw' : '800px',    // ← 90% sur mobile, 600px sur desktop
    maxHeight: isMobile ? '200vh' : '700px',   // ← 70% sur mobile, 500px sur desktop
    objectFit: 'contain'
  }}
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.5 }}
/>

          {/* Pourcentage */}
          <motion.p
            style={{
              marginTop: '40px',
              fontSize: '32px',
              color: '#000000',
              fontFamily: 'MyFont, sans-serif',
              fontWeight: 'bold'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;