import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './fonts.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ici tu pourras ajouter l'envoi réel (EmailJS, API, etc.)
    console.log('📧 Formulaire envoyé:', formData);
    
    // Afficher le message de confirmation
    setIsSubmitted(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative" style={{ width: '600px', height: '700px' }}>
      
      {/* Image de fond - ton illustration */}
      <img 
        src="/images/contact-form.svg"
        alt="Formulaire de contact"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: -70,
          zIndex: 1
        }}
      />

      {/* Formulaire en overlay */}
      <form 
        onSubmit={handleSubmit}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 2,
          fontFamily: 'MyFont, sans-serif'
        }}
      >
        
        {/* Champ NAME - à positionner sur la zone foncée */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Votre nom"
          style={{
            position: 'absolute',
            left: '25%',        // ⚙️ AJUSTE : Position horizontale
            top: '26.5%',         // ⚙️ AJUSTE : Position verticale
            width: '30%',       // ⚙️ AJUSTE : Largeur du champ
            height: '4%',       // ⚙️ AJUSTE : Hauteur du champ
            background: 'rgba(139, 98, 63, 0)', // Légère transparence
            border: 'none',
            borderRadius: '8px',
            padding: '0 15px',
            fontSize: '16px',
            color: '#2d2d2d',
            outline: 'none'
          }}
        />

        {/* Champ EMAIL - à positionner sur la zone foncée */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Votre email"
          style={{
            position: 'absolute',
            left: '26.5%',        // ⚙️ AJUSTE : Position horizontale
            top: '33%',         // ⚙️ AJUSTE : Position verticale
            width: '36%',       // ⚙️ AJUSTE : Largeur du champ
            height: '4%',       // ⚙️ AJUSTE : Hauteur du champ
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            borderRadius: '8px',
            padding: '0 15px',
            fontSize: '16px',
            color: '#2d2d2d',
            outline: 'none'
          }}
        />

        {/* Champ MESSAGE - à positionner sur la grande zone foncée */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Votre message"
          style={{
            position: 'absolute',
            left: '26.5%',        // ⚙️ AJUSTE : Position horizontale
            top: '38%',         // ⚙️ AJUSTE : Position verticale
            width: '36%',       // ⚙️ AJUSTE : Largeur du champ
            height: '34%',      // ⚙️ AJUSTE : Hauteur du champ
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            borderRadius: '8px',
            padding: '15px',
            fontSize: '16px',
            color: '#2d2d2d',
            outline: 'none',
            resize: 'none',
            fontFamily: 'MyFont, sans-serif'
          }}
        />

        {/* Zone cliquable sur le bouton SEND */}
        <button
          type="submit"
          style={{
            position: 'absolute',
            left: '48%',        // ⚙️ AJUSTE : Position horizontale du bouton
            top: '73%',         // ⚙️ AJUSTE : Position verticale du bouton
            width: '18%',       // ⚙️ AJUSTE : Largeur de la zone cliquable
            height: '7%',       // ⚙️ AJUSTE : Hauteur de la zone cliquable
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}
          aria-label="Envoyer le message"
        />
        
      </form>

      {/* Message de confirmation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#4ade80',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 'bold',
              fontFamily: 'MyFont, sans-serif',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              zIndex: 10,
              border: '3px solid #22c55e'
            }}
          >
            ✓ Message envoyé !
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default ContactForm;
