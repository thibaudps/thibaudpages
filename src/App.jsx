import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CorkBoard from './components/CorkBoard';
import CorkBoardMobile from './components/CorkBoardMobile';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && (isMobile ? <CorkBoardMobile /> : <CorkBoard />)}
    </>
  );
}

export default App;