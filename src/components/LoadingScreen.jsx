/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './fonts.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2; // Augmente de 2% toutes les 50ms = 2.5 secondes total
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300 z-[200] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* Zone pour ton GIF animé (à ajouter plus tard) */}
      <div className="mb-16">
        {/* <img src="/images/loading/animation.gif" alt="Loading animation" style={{ width: '400px' }} /> */}
        <div className="text-gray-800 text-6xl font-bold" style={{ fontFamily: 'MyFont, sans-serif' }}>
          Portfolio
        </div>
      </div>

      {/* Barre de chargement */}
      <div className="w-80 mb-4">
        <div className="bg-white/30 rounded-full h-4 overflow-hidden border-2 border-gray-800">
          <motion.div
            className="bg-yellow-400 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Texte de chargement */}
      <motion.p
        style={{ fontFamily: 'MyFont, sans-serif' }}
        className="text-gray-800 text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Chargement... {progress}%
      </motion.p>

      {/* Texte de bienvenue */}
      <motion.p
        style={{ fontFamily: 'MyFont, sans-serif' }}
        className="text-gray-600 text-sm mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Bienvenue sur mon portfolio !
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;