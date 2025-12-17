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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showLoading) {
    return <LoadingScreen />
  }

  return isMobile ? <CorkBoardMobile /> : <CorkBoard />
}

export default App