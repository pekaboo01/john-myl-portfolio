import React, { useEffect } from 'react'

const ScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
    )
    
    animatedElements.forEach(el => observer.observe(el))

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)

    // Particle system
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles')
      if (!particlesContainer) return

      const particleCount = 20
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 6 + 's'
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's'
        particlesContainer.appendChild(particle)
      }
    }

    createParticles()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

export default ScrollAnimations
