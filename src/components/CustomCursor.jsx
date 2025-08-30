import React, { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateCursor = (e) => {
      setCursor({ x: e.clientX, y: e.clientY })
    }

    const updateFollower = () => {
      setFollower(prev => ({
        x: prev.x + (cursor.x - prev.x) * 0.1,
        y: prev.y + (cursor.y - prev.y) * 0.1
      }))
    }

    const handleMouseMove = (e) => {
      updateCursor(e)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .tech-card, .project-card, .contact-item, .social-icon, .nav-link')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Animation loop for follower
    const animateFollower = () => {
      updateFollower()
      requestAnimationFrame(animateFollower)
    }
    animateFollower()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursor])

  return (
    <>
      <div 
        className={`cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${cursor.x - 10}px`,
          top: `${cursor.y - 10}px`
        }}
      />
      <div 
        className={`cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${follower.x - 20}px`,
          top: `${follower.y - 20}px`
        }}
      />
    </>
  )
}

export default CustomCursor
