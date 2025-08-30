import React, { useState, useEffect } from 'react'
import './LoadingPage.css'

const LoadingPage = ({ className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [matrixChars, setMatrixChars] = useState([])

  useEffect(() => {
    const fullText = '<404 Greeting Not Found> |'
    
    // Type out the text character by character with natural typing rhythm
    let index = 0
    const typeText = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typeText)
        // Keep cursor blinking after text is complete
      }
    }, 120) // Slightly slower for more natural typing feel

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 600) // Slightly slower blink for better visibility

    // Matrix-style falling characters (reduced frequency)
    const matrixInterval = setInterval(() => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      const newChar = {
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        y: -10,
        speed: Math.random() * 1.5 + 0.8, // Slightly slower fall
        opacity: Math.random() * 0.4 + 0.2 // More subtle
      }
      setMatrixChars(prev => [...prev.slice(-15), newChar]) // Fewer characters for cleaner look
    }, 300) // Less frequent spawning

    // Cleanup matrix characters
    const cleanupInterval = setInterval(() => {
      setMatrixChars(prev => prev.filter(char => char.y < 110))
    }, 100)

    // Animate matrix characters
    const animateInterval = setInterval(() => {
      setMatrixChars(prev => 
        prev.map(char => ({
          ...char,
          y: char.y + char.speed
        }))
      )
    }, 60) // Slightly slower animation for smoother movement

    return () => {
      clearInterval(typeText)
      clearInterval(cursorInterval)
      clearInterval(matrixInterval)
      clearInterval(cleanupInterval)
      clearInterval(animateInterval)
    }
  }, [])

  return (
    <div className={`loading-page ${className}`}>
      {/* Matrix falling characters */}
      {matrixChars.map((char, index) => (
        <div
          key={index}
          className="matrix-char"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            opacity: char.opacity,
            animationDelay: `${index * 0.1}s`
          }}
        >
          {char.char}
        </div>
      ))}
      
      <div className="loading-content">
        <div className="terminal-text">
          {displayText}
          {showCursor && <span className="cursor">_</span>}
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
