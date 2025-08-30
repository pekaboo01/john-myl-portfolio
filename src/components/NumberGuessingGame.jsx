import React, { useState, useEffect } from 'react'

const NumberGuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(null)
  const [playerGuess, setPlayerGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [bestScore, setBestScore] = useState(localStorage.getItem('numberGameBestScore') || '∞')
  const [gameHistory, setGameHistory] = useState([])
  const [gameState, setGameState] = useState('waiting') // waiting, playing, won
  const [hint, setHint] = useState('')
  const [timeStarted, setTimeStarted] = useState(null)
  const [gameTime, setGameTime] = useState(0)

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1
    setTargetNumber(newTarget)
    setPlayerGuess('')
    setMessage('')
    setAttempts(0)
    setGameState('playing')
    setHint('')
    setTimeStarted(Date.now())
    setGameTime(0)
  }

  const handleGuess = () => {
    if (!playerGuess || gameState !== 'playing') return
    
    const guess = parseInt(playerGuess)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('Please enter a valid number between 1 and 100!')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guess === targetNumber) {
      const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000)
      setGameTime(timeElapsed)
      setGameState('won')
      setMessage(`🎉 Congratulations! You found the number in ${newAttempts} attempts!`)
      
      // Update best score
      if (bestScore === '∞' || newAttempts < parseInt(bestScore)) {
        setBestScore(newAttempts.toString())
        localStorage.setItem('numberGameBestScore', newAttempts.toString())
      }
      
      // Add to history
      setGameHistory(prev => [{
        target: targetNumber,
        attempts: newAttempts,
        time: timeElapsed,
        timestamp: new Date().toLocaleDateString()
      }, ...prev.slice(0, 9)]) // Keep last 10 games
      
    } else {
      const difference = Math.abs(guess - targetNumber)
      let newHint = ''
      
      if (difference <= 5) {
        newHint = '🔥 Very Hot!'
      } else if (difference <= 10) {
        newHint = '🌡️ Hot!'
      } else if (difference <= 20) {
        newHint = '😐 Warm'
      } else if (difference <= 30) {
        newHint = '❄️ Cold'
      } else {
        newHint = '🧊 Very Cold!'
      }
      
      setHint(newHint)
      setMessage(guess > targetNumber ? '📉 Too high! Try a lower number.' : '📈 Too low! Try a higher number.')
    }
    
    setPlayerGuess('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  const resetGame = () => {
    setGameState('waiting')
    setTargetNumber(null)
    setPlayerGuess('')
    setMessage('')
    setAttempts(0)
    setHint('')
    setGameTime(0)
  }

  // Timer effect
  useEffect(() => {
    let interval
    if (gameState === 'playing' && timeStarted) {
      interval = setInterval(() => {
        setGameTime(Math.floor((Date.now() - timeStarted) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, timeStarted])

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Title */}
      <h2 style={{
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        🎯 Number Guessing Game
      </h2>

      {/* Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ color: '#00d4aa', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Best Score</div>
          <div>{bestScore}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Attempts</div>
          <div>{attempts}</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Time</div>
          <div>{gameTime}s</div>
        </div>
      </div>

      {/* Game Area */}
      {gameState === 'waiting' ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            I'm thinking of a number between 1 and 100...
          </p>
          <button
            onClick={startNewGame}
            style={{
              background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            🚀 Start Game!
          </button>
        </div>
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Target Number Display (for debugging - remove in production) */}
          {gameState === 'won' && (
            <div style={{
              fontSize: '3rem',
              color: '#00d4aa',
              marginBottom: '1rem'
            }}>
              {targetNumber}
            </div>
          )}

          {/* Game Status */}
          <div style={{
            fontSize: '1.3rem',
            color: gameState === 'won' ? '#00d4aa' : '#ccc',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            {gameState === 'won' ? '🎉 You Won!' : `Guess the number (1-100) - Attempt ${attempts + 1}`}
          </div>

          {/* Input and Button */}
          {gameState === 'playing' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <input
                type="number"
                value={playerGuess}
                onChange={(e) => setPlayerGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess"
                style={{
                  padding: '0.8rem 1rem',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  border: '2px solid #00d4aa',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  width: '200px',
                  outline: 'none'
                }}
                min="1"
                max="100"
              />
              <button
                onClick={handleGuess}
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                🎯 Guess!
              </button>
            </div>
          )}

          {/* Hint */}
          {hint && gameState === 'playing' && (
            <div style={{
              fontSize: '1.5rem',
              color: '#ffd93d',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              {hint}
            </div>
          )}

          {/* Message */}
          {message && (
            <div style={{
              fontSize: '1.1rem',
              color: gameState === 'won' ? '#00d4aa' : '#ff6b6b',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px'
            }}>
              {message}
            </div>
          )}

          {/* Game Over Actions */}
          {gameState === 'won' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={startNewGame}
                style={{
                  background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                🎮 Play Again
              </button>
              <button
                onClick={resetGame}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                🏠 Main Menu
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game History */}
      {gameHistory.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '1rem',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Recent Games</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {gameHistory.map((game, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ color: '#00d4aa' }}>🎯 {game.target}</span>
                <span style={{ color: '#ffd93d' }}>📊 {game.attempts} attempts</span>
                <span style={{ color: '#ff6b6b' }}>⏱️ {game.time}s</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{game.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NumberGuessingGame
