import React, { useState, useEffect } from 'react'
import SnakeGame from './SnakeGame'
import './Hero.css'

const Hero = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  
  const greetings = [
    { text: 'Hi', lang: 'English' },
    { text: 'Hola', lang: 'Spanish' },
    { text: 'Bonjour', lang: 'French' },
    { text: 'Ciao', lang: 'Italian' },
    { text: 'Hallo', lang: 'German' },
    { text: 'こんにちは', lang: 'Japanese' },
    { text: '안녕하세요', lang: 'Korean' },
    { text: '你好', lang: 'Chinese' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [greetings.length])

  const handleMagneticHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  }

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)'
  }

  return (
    <section id="home" className="section hero">
      <div className="particles"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting-container fade-in stagger-1">
              <span className="greeting">{greetings[currentGreeting].text}</span>
              <span className="greeting-lang">({greetings[currentGreeting].lang})</span>
            </div>
            
            <h1 className="hero-name fade-in stagger-2">
              I'm <span className="name-highlight">John Myl Alinsonorin</span>
            </h1>
            
            <h2 className="hero-title fade-in stagger-3">Software Engineer</h2>
            
            <p className="hero-description fade-in stagger-4">
              A software engineer who loves learning and creating things that make life a little easier. 
              I'm not good at everything but I'm always curious and open to improving myself along the way. 
              I enjoy working with others, sharing ideas, and finding solutions together. For me, every project is 
              not just about building software but also about growing as a person and helping in any way I can.
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-elements">
              <div 
                className="floating-element element-1 magnetic"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                💻
              </div>
              <div 
                className="floating-element element-2 magnetic"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                🚀
              </div>
              <div 
                className="floating-element element-3 magnetic"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                ⚡
              </div>
              <div 
                className="floating-element element-4 magnetic"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                🎨
              </div>
            </div>
            
            <SnakeGame />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
