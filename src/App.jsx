import { useState, useEffect } from 'react'
import CorkBoard from './components/CorkBoard'
import CorkBoardMobile from './components/CorkBoardMobile'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

function App() {
  const [showLoading, setShowLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fonction appelée quand le chargement est terminé
  const handleLoadComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />
  }

  return isMobile ? <CorkBoardMobile /> : <CorkBoard />
}

export default App