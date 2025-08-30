import React, { useState, useEffect } from 'react'
import LoadingPage from './components/LoadingPage'
import ScrollAnimations from './components/ScrollAnimations'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
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
    <div className="App">
      <ScrollAnimations />
      
      {/* Particle Background */}
      <div className="particles"></div>
      
      <Header />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
