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

  const handleLoadComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />
  }

  return (
    <>
      {/* Bloc SEO : texte lisible par Google, invisible visuellement */}
      <div style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        <h1>Thibaud Pagès – Graphiste Illustrateur Freelance</h1>
        <h2>Portfolio graphisme et illustration – Pays de Gex & Genève</h2>
        <p>
          Graphiste illustrateur freelance basé dans le Pays de Gex, à deux pas de Genève.
          Je crée des affiches de concerts, des identités visuelles pour musiciens et associations
          culturelles, et des illustrations pour l'édition jeunesse.
          Je travaille pour des clients en France et en Suisse.
        </p>
        <p>
          Spécialisé dans le secteur culturel : musique, théâtre, associations, édition.
          Micro-entreprise basée dans l'Ain (01), disponible pour tout projet graphique ou illustratif.
        </p>
        <ul>
          <li>Affiches de concerts et événements culturels</li>
          <li>Identités visuelles pour musiciens et groupes</li>
          <li>Illustration jeunesse et éditoriale</li>
          <li>Branding et charte graphique pour associations</li>
          <li>Graphiste freelance Genève et Pays de Gex</li>
        </ul>
      </div>

      {isMobile ? <CorkBoardMobile /> : <CorkBoard />}
    </>
  )
}

export default App
