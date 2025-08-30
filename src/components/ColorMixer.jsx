import React, { useState, useEffect } from 'react'

const ColorMixer = () => {
  const [red, setRed] = useState(0)
  const [green, setGreen] = useState(0)
  const [blue, setBlue] = useState(0)
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 })
  const [gameState, setGameState] = useState('waiting') // waiting, playing, won
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [bestScore, setBestScore] = useState(localStorage.getItem('colorMixerBestScore') || 0)
  const [gameHistory, setGameHistory] = useState([])
  const [timeStarted, setTimeStarted] = useState(null)
  const [gameTime, setGameTime] = useState(0)
  const [difficulty, setDifficulty] = useState('easy') // easy, medium, hard
  const [hint, setHint] = useState('')

  const generateTargetColor = () => {
    const maxValue = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 150 : 255
    const step = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10
    
    const r = Math.floor(Math.random() * (maxValue / step)) * step
    const g = Math.floor(Math.random() * (maxValue / step)) * step
    const b = Math.floor(Math.random() * (maxValue / step)) * step
    
    return { r, g, b }
  }

  const startNewGame = () => {
    const newTarget = generateTargetColor()
    setTargetColor(newTarget)
    setRed(0)
    setGreen(0)
    setBlue(0)
    setGameState('playing')
    setAttempts(0)
    setHint('')
    setTimeStarted(Date.now())
    setGameTime(0)
  }

  const checkMatch = () => {
    if (gameState !== 'playing') return
    
    const tolerance = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15
    const rDiff = Math.abs(red - targetColor.r)
    const gDiff = Math.abs(green - targetColor.g)
    const bDiff = Math.abs(blue - targetColor.b)
    
    const isMatch = rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance
    
    if (isMatch) {
      const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000)
      setGameTime(timeElapsed)
      setGameState('won')
      
      // Calculate score based on accuracy and time
      const accuracy = Math.max(0, 100 - (rDiff + gDiff + bDiff) / 3)
      const timeBonus = Math.max(0, 100 - timeElapsed)
      const difficultyBonus = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 150
      const roundScore = Math.round(accuracy + timeBonus + difficultyBonus)
      
      setScore(prev => prev + roundScore)
      
      // Update best score
      if (roundScore > bestScore) {
        setBestScore(roundScore)
        localStorage.setItem('colorMixerBestScore', roundScore.toString())
      }
      
      // Add to history
      setGameHistory(prev => [{
        target: targetColor,
        player: { r: red, g: green, b: blue },
        accuracy: Math.round(accuracy),
        time: timeElapsed,
        score: roundScore,
        timestamp: new Date().toLocaleDateString()
      }, ...prev.slice(0, 9)]) // Keep last 10 games
      
    } else {
      setAttempts(prev => prev + 1)
      
      // Provide hints
      let newHint = ''
      if (rDiff > tolerance) {
        newHint += red > targetColor.r ? 'Red is too high! ' : 'Red is too low! '
      }
      if (gDiff > tolerance) {
        newHint += green > targetColor.g ? 'Green is too high! ' : 'Green is too low! '
      }
      if (bDiff > tolerance) {
        newHint += blue > targetColor.b ? 'Blue is too high! ' : 'Blue is too low! '
      }
      
      setHint(newHint.trim())
    }
  }

  const resetGame = () => {
    setGameState('waiting')
    setRed(0)
    setGreen(0)
    setBlue(0)
    setTargetColor({ r: 0, g: 0, b: 0 })
    setAttempts(0)
    setHint('')
    setGameTime(0)
  }

  const resetScore = () => {
    setScore(0)
    setBestScore(0)
    localStorage.removeItem('colorMixerBestScore')
    setGameHistory([])
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

  const getCurrentColor = () => `rgb(${red}, ${green}, ${blue})`
  const getTargetColorString = () => `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'easy': return { maxValue: 100, step: 20, tolerance: 30 }
      case 'medium': return { maxValue: 150, step: 15, tolerance: 20 }
      case 'hard': return { maxValue: 255, step: 10, tolerance: 15 }
      default: return { maxValue: 100, step: 20, tolerance: 30 }
    }
  }

  const config = getDifficultyConfig()

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '800px',
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
        🎨 Color Mixer
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
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap'
      }}>
        <div style={{ color: '#00d4aa', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Current Score</div>
          <div>{score}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Best Score</div>
          <div>{bestScore}</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Attempts</div>
          <div>{attempts}</div>
        </div>
        <div style={{ color: '#9c88ff', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Time</div>
          <div>{gameTime}s</div>
        </div>
      </div>

      {/* Game Controls */}
      {gameState === 'waiting' ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <label style={{ color: '#ccc', fontSize: '1.1rem' }}>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                border: '2px solid #00d4aa',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              <option value="easy">Easy (0-100, step 20)</option>
              <option value="medium">Medium (0-150, step 15)</option>
              <option value="hard">Hard (0-255, step 10)</option>
            </select>
          </div>
          
          <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Mix RGB colors to match the target color! Learn color theory and improve your color perception.
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
          {/* Game Status */}
          <div style={{
            fontSize: '1.3rem',
            color: gameState === 'won' ? '#00d4aa' : '#ccc',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            {gameState === 'won' ? '🎉 Perfect Match! You got it!' : 'Mix the colors to match the target!'}
          </div>

          {/* Color Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            {/* Target Color */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#00d4aa', marginBottom: '1rem' }}>Target Color</h3>
              <div style={{
                width: '120px',
                height: '120px',
                background: getTargetColorString(),
                borderRadius: '15px',
                border: '3px solid #00d4aa',
                marginBottom: '0.5rem'
              }} />
              <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                RGB({targetColor.r}, {targetColor.g}, {targetColor.b})
              </p>
            </div>

            {/* VS */}
            <div style={{
              fontSize: '2rem',
              color: '#888'
            }}>
              ⚔️
            </div>

            {/* Player Color */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Your Color</h3>
              <div style={{
                width: '120px',
                height: '120px',
                background: getCurrentColor(),
                borderRadius: '15px',
                border: '3px solid #ff6b6b',
                marginBottom: '0.5rem'
              }} />
              <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
                RGB({red}, {green}, {blue})
              </p>
            </div>
          </div>

          {/* Color Sliders */}
          <div style={{
            marginBottom: '2rem'
          }}>
            {/* Red Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#ff6b6b', fontSize: '1.1rem', fontWeight: 'bold', marginRight: '1rem' }}>
                🔴 Red: {red}
              </label>
              <input
                type="range"
                min="0"
                max={config.maxValue}
                step={config.step}
                value={red}
                onChange={(e) => setRed(parseInt(e.target.value))}
                style={{
                  width: '300px',
                  height: '8px',
                  borderRadius: '5px',
                  background: 'rgba(255, 107, 107, 0.3)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Green Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#00d4aa', fontSize: '1.1rem', fontWeight: 'bold', marginRight: '1rem' }}>
                🟢 Green: {green}
              </label>
              <input
                type="range"
                min="0"
                max={config.maxValue}
                step={config.step}
                value={green}
                onChange={(e) => setGreen(parseInt(e.target.value))}
                style={{
                  width: '300px',
                  height: '8px',
                  borderRadius: '5px',
                  background: 'rgba(0, 212, 170, 0.3)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Blue Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#9c88ff', fontSize: '1.1rem', fontWeight: 'bold', marginRight: '1rem' }}>
                🔵 Blue: {blue}
              </label>
              <input
                type="range"
                min="0"
                max={config.maxValue}
                step={config.step}
                value={blue}
                onChange={(e) => setBlue(parseInt(e.target.value))}
                style={{
                  width: '300px',
                  height: '8px',
                  borderRadius: '5px',
                  background: 'rgba(156, 136, 255, 0.3)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* Hint */}
          {hint && gameState === 'playing' && (
            <div style={{
              fontSize: '1.1rem',
              color: '#ffd93d',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 217, 61, 0.1)',
              borderRadius: '10px',
              fontWeight: 'bold'
            }}>
              💡 {hint}
            </div>
          )}

          {/* Check Match Button */}
          {gameState === 'playing' && (
            <button
              onClick={checkMatch}
              style={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '15px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem'
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
              🎯 Check Match
            </button>
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
                🎮 Next Color
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

      {/* Game Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        {gameState === 'playing' && (
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
            🔄 Reset Game
          </button>
        )}
        <button
          onClick={resetScore}
          style={{
            background: 'linear-gradient(135deg, #9c88ff 0%, #8b7fd8 100%)',
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
            e.target.style.boxShadow = '0 8px 25px rgba(156, 136, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          🏆 Reset Score
        </button>
      </div>

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
                <span style={{ color: '#00d4aa' }}>🎯 {game.accuracy}%</span>
                <span style={{ color: '#ffd93d' }}>📊 {game.time}s</span>
                <span style={{ color: '#9c88ff' }}>🏆 {game.score}</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{game.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorMixer
