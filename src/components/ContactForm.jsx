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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mlgrerjw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('📧 Message envoyé avec succès !');
        setIsSubmitted(true);
        
        // Réinitialiser après 3 secondes
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        alert('Erreur lors de l\'envoi. Réessayez.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative" style={{ width: '600px', height: '700px' }}>
      
      {/* Image de fond - ton illustration */}
      <img 
        src="images/contact-form.svg"
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
          left: -50,
          zIndex: 2,
          fontFamily: 'MyFont, sans-serif'
        }}
      >
        
        {/* Champ NAME */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Votre nom"
          disabled={isSubmitting}
          style={{
            position: 'absolute',
            left: '33%',
            top: '26.5%',
            width: '34%',
            height: '4%',
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            borderRadius: '8px',
            padding: '0 15px',
            fontSize: '16px',
            color: '#2d2d2d',
            outline: 'none'
          }}
        />

        {/* Champ EMAIL */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Votre email"
          disabled={isSubmitting}
          style={{
            position: 'absolute',
            left: '34%',
            top: '32.5%',
            width: '36%',
            height: '4%',
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            borderRadius: '8px',
            padding: '0 15px',
            fontSize: '16px',
            color: '#2d2d2d',
            outline: 'none'
          }}
        />

        {/* Champ MESSAGE */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Votre message"
          disabled={isSubmitting}
          style={{
            position: 'absolute',
            left: '35%',
            top: '40%',
            width: '36%',
            height: '32%',
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

        {/* Bouton SEND */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            position: 'absolute',
            left: '56.5%',
            top: '73.5%',
            width: '17%',
            height: '6.5%',
            background: 'rgba(139, 98, 63, 0)',
            border: 'none',
            cursor: isSubmitting ? 'wait' : 'pointer',
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