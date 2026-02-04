/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRINT_CONFIG } from '../portfolioConfig';

const PrintModal = ({ card, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [withFrame, setWithFrame] = useState(false);

  if (!card?.printAvailable || !card?.printSizes) return null;

  const handlePurchase = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }

    const link = withFrame ? selectedSize.stripeLinkFramed : selectedSize.stripeLink;
    window.open(link, '_blank');
  };

  const currentPrice = selectedSize 
    ? selectedSize.price + (withFrame ? PRINT_CONFIG.framingPrice : 0)
    : null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{
          background: '#F8F0E4',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          padding: '32px',
          position: 'relative',
          border: '4px solid #000000',
          fontFamily: 'MyFont, sans-serif',
          boxShadow: '0 20px 25px rgba(0,0,0,0.3)'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#fbbf24',
            border: '2px solid #1f2937',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}
        >
          ✕
        </button>

        {/* Titre */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#1f2937'
        }}>
          Commander le print
        </h2>
        <p style={{
          fontSize: '25px',
          fontWeight: 'bold',
          color: '#363D4C',
          marginBottom: '10px'
        }}>
          "{card.title}"
        </p>

        {/* Sélection de taille */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#1f2937'
          }}>
            Choisissez une taille :
          </label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {card.printSizes.map((size, idx) => {
              const seed = idx + 1;
              const borderWidths = [
                3 + (seed % 2),
                2 + (seed % 3), 
                4 + (seed % 2),
                3 + ((seed * 2) % 3)
              ];
              const borderRadii = [
                12 + (seed % 4),
                14 + ((seed * 2) % 4),
                13 + ((seed * 3) % 4),
                15 + (seed % 3)
              ];
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '14px 18px',
                    border: `${borderWidths[0]}px solid #1f2937`,
                    borderWidth: `${borderWidths[0]}px ${borderWidths[1]}px ${borderWidths[2]}px ${borderWidths[3]}px`,
                    background: selectedSize === size ? '#fef3c7' : '#FFF6F4',
                    borderRadius: `${borderRadii[0]}px ${borderRadii[1]}px ${borderRadii[2]}px ${borderRadii[3]}px`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    boxShadow: selectedSize === size 
                      ? `${4 + seed % 2}px ${4 + seed % 2}px 0px #1f2937` 
                      : `${2 + seed % 2}px ${2 + seed % 2}px 0px rgba(0,0,0,0.15)`,
                    transform: selectedSize === size ? `translate(-${2 + seed % 2}px, -${2 + seed % 2}px)` : 'none'
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '15px' }}>
                    {size.name}
                  </span>
                  <span style={{ color: '#000000', fontSize: '17px' }}>
                    {size.price}€
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Option encadrement */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            border: '4px solid #1f2937',
            borderWidth: '4px 3px 5px 4px',
            borderRadius: '14px 16px 15px 13px',
            cursor: 'pointer',
            background: withFrame ? '#fef3c7' : '#FFF6F4',
            transition: 'all 0.2s',
            boxShadow: withFrame 
              ? '5px 5px 0px #1f2937' 
              : '3px 3px 0px rgba(0,0,0,0.15)',
            transform: withFrame ? 'translate(-2px, -2px)' : 'none'
          }}>
            <input
              type="checkbox"
              checked={withFrame}
              onChange={(e) => setWithFrame(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#fbbf24'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
                Avec encadrement, disponible seulement en retrait
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Cadre fin en bois naturel ou noir
              </div>
            </div>
            <span style={{ color: '#000000', fontWeight: 'bold' }}>
              +{PRINT_CONFIG.framingPrice}€
            </span>
          </label>
        </div>

        {/* Info retrait */}
        <div style={{
          padding: '14px',
          background: '#eff6ff',
          border: '3px solid #3b82f6',
          borderWidth: '4px 3px 3px 4px',
          borderRadius: '13px 15px 14px 12px',
          marginBottom: '24px',
          boxShadow: '3px 3px 0px rgba(59, 130, 246, 0.25)'
        }}>
          <div style={{ fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>
            📍 {PRINT_CONFIG.pickupInfo}
          </div>
          <div style={{ fontSize: '11px', color: '#60a5fa', marginTop: '4px' }}>
            (Indiquez "RETRAIT" dans les notes lors du paiement)
          </div>
        </div>

        {/* Prix total */}
        {currentPrice && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingTop: '16px',
            borderTop: '3px solid #1f2937'
          }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
              Total
            </span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>
              {currentPrice}€
            </span>
          </div>
        )}

        {/* Bouton Commander */}
        <button
          onClick={handlePurchase}
          disabled={!selectedSize}
          style={{
            width: '100%',
            padding: '18px',
            background: selectedSize ? '#fbbf24' : '#d1d5db',
            border: '5px solid #1f2937',
            borderWidth: '5px 4px 6px 5px',
            borderRadius: '16px 18px 17px 15px',
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#1f2937',
            cursor: selectedSize ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: selectedSize 
              ? '6px 6px 0px #1f2937' 
              : '3px 3px 0px rgba(0,0,0,0.2)',
            transform: 'none'
          }}
          onMouseEnter={(e) => {
            if (selectedSize) {
              e.target.style.transform = 'translate(-3px, -3px)';
              e.target.style.boxShadow = '8px 8px 0px #1f2937';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedSize) {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '6px 6px 0px #1f2937';
            }
          }}
        >
          {selectedSize ? '🛒 Commander sur Stripe' : 'Sélectionnez une taille'}
        </button>

        <p style={{
          fontSize: '11px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '12px'
        }}>
          Paiement sécurisé via Stripe • Livraison France & Suisse
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PrintModal;