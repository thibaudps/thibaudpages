import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CorkBoard from './components/CorkBoard';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CorkBoard />
    </>
  );
}

export default App;