import React, { useEffect, useState } from 'react'
import './LovePage.css'

const LovePage = () => {
  const [flowers, setFlowers] = useState([])
  const [showFirstModal, setShowFirstModal] = useState(true)
  const [showSecondModal, setShowSecondModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showLoveMessage, setShowLoveMessage] = useState(false)

  useEffect(() => {
    // Create animated flowers
    const flowerTypes = ['🌹', '🌷', '🌺', '🌸', '💐', '🌻', '🌼', '🌿']
    const newFlowers = []
    
    for (let i = 0; i < 50; i++) {
      newFlowers.push({
        id: i,
        emoji: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 30
      })
    }
    
    setFlowers(newFlowers)
  }, [])

  const handleYesClick = () => {
    setShowFirstModal(false)
    setShowSecondModal(true)
  }

  const handleNoClick = () => {
    window.location.href = '/'
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === '11212001') {
      setError('')
      setShowSecondModal(false)
      setIsAuthenticated(true)
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  const goBackToPortfolio = () => {
    window.location.href = '/'
  }

  const handleImageClick = () => {
    setShowLoveMessage(true)
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowLoveMessage(false)
    }, 5000)
  }

  // First Modal: Are you Mary?
  if (showFirstModal) {
    return (
      <div className="love-page">
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-icon">💕</div>
              <h2 className="modal-title">Are you Mary?</h2>
              <div className="modal-buttons">
                <button onClick={handleYesClick} className="modal-btn modal-btn-yes">
                  Yes
                </button>
                <button onClick={handleNoClick} className="modal-btn modal-btn-no">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Second Modal: Password Verification
  if (showSecondModal) {
    return (
      <div className="love-page">
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-icon">🔐</div>
              <h2 className="modal-title">Verify if you are Mary:</h2>
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter password"
                  className="password-input"
                  autoFocus
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="modal-btn modal-btn-submit">
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Love Page Content (only shown after authentication)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="love-page">
      {/* Animated Background Flowers */}
      <div className="flowers-container">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="flower"
            style={{
              left: `${flower.left}%`,
              animationDelay: `${flower.delay}s`,
              animationDuration: `${flower.duration}s`,
              fontSize: `${flower.size}px`
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="hearts-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="love-content">
        <button 
          onClick={goBackToPortfolio}
          className="back-button"
        >
          ← Back to Portfolio
        </button>

        <div className="love-main">
          {/* Title Section */}
          <div className="title-section">
            <h1 className="valentine-title">
              Happy Valentine's Day
            </h1>
            <h2 className="valentine-name">
              Asawaa nakoo!!!
            </h2>
            <div className="title-hearts">
              <span className="heart-emoji">💕</span>
              <span className="heart-emoji">💖</span>
              <span className="heart-emoji">💗</span>
            </div>
          </div>

          {/* Photo Section */}
          <div className="photo-section">
            <div className="photo-frame">
              <div className="photo-wrapper" onClick={handleImageClick}>
                <img 
                  src="/images/us.jpg" 
                  alt="John and Mary" 
                  className="photo-image"
                  onError={(e) => {
                    // If image doesn't exist, show placeholder
                    e.target.style.display = 'none'
                    e.target.parentElement.nextElementSibling.style.display = 'flex'
                  }}
                />
                <div className="click-me-overlay">
                  <span className="click-me-text">Click Me 💕</span>
                </div>
              </div>
              <div className="photo-placeholder" style={{ display: 'none' }}>
                <div className="photo-icon">📸</div>
                <p className="photo-text">Your beautiful memories together</p>
                <p className="photo-hint">Add your photo to public/images/couple-photo.jpg</p>
              </div>
            </div>
          </div>

          {/* Love Message Modal */}
          {showLoveMessage && (
            <div className="love-message-overlay">
              <div className="love-message-content">
                <div className="love-message-heart">💖</div>
                <p className="love-message-text">I love you my love, always!</p>
              </div>
            </div>
          )}

          {/* Message Section */}
          <div className="message-section">
            <div className="message-card">
              <p className="message-text">
                Even though I forgot to give you a flower yesterday, 
                I hope this digital garden of flowers makes up for it! 
                <br /><br />
                In this journey we share, there are moments of sunshine and storms, 
                days when we laugh until our sides hurt, and nights when words 
                become weapons in misunderstandings.
                <br /><br />
                Still, we find our way back — not perfectly, but honestly.
                Not loudly, but gently.
                <br /><br />
                We’re two imperfect hearts learning the same language,
                stumbling through pride, then softening into grace.
                We bend, we bloom, we begin again —
                not because it’s easy, but because it feels true.
                <br /><br />
                What we’re building isn’t fragile glass;
                it’s something steady, something grown —
                rooted in patience,
                shaped by effort,
                stronger after every storm we’ve known.
                <br /><br />
                So here’s to the calm after the rain,
                laughter that lingers long after the day,
                choosing understanding over winning,
                finding our way back, come what may.
                <br /><br />
                And through it all, I choose
                to embrace the warmth of your heart
                and to always call it <i>HOME</i>. 💝
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LovePage

