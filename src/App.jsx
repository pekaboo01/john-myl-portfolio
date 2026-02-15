import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoadingPage from './components/LoadingPage'
import ScrollAnimations from './components/ScrollAnimations'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Contact from './components/Contact'
import GamesPage from './pages/GamesPage'
import LovePage from './pages/LovePage'

// Main Portfolio Component with Loading
const MainPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Show loading page for 6 seconds to allow all animations to complete
    const timer = setTimeout(() => {
      setIsTransitioning(true)
      // After fade out animation completes, hide loading page
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }, 6000) // Increased from 3000ms to 6000ms

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <LoadingPage
        className={isTransitioning ? 'fade-out' : ''}
      />
    )
  }

  return (
    <>
      <ScrollAnimations />
      <div className="particles"></div>
      <Header />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Portfolio Route - Shows Loading Page */}
          <Route path="/" element={<MainPortfolio />} />
          
          {/* Games Page Route - No Loading Page */}
          <Route path="/games" element={<GamesPage />} />
          
          {/* Love Page Route */}
          <Route path="/love" element={<LovePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
