import React, { useState, useEffect } from 'react'

const MemoryGame = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [gameState, setGameState] = useState('waiting') // waiting, playing, won
  const [difficulty, setDifficulty] = useState('easy') // easy: 6 pairs, medium: 8 pairs, hard: 10 pairs
  const [bestScore, setBestScore] = useState(localStorage.getItem('memoryGameBestScore') || '∞')
  const [gameHistory, setGameHistory] = useState([])
  const [timeStarted, setTimeStarted] = useState(null)

  const emojis = ['🐍', '🦊', '🐸', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🦄', '🐙', '🦋', '🐞', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴']

  const initializeGame = () => {
    const pairCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10
    const selectedEmojis = emojis.slice(0, pairCount)
    const gameCards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji,
        isFlipped: false,
        isMatched: false
      }))
    
    setCards(gameCards)
    setFlippedCards([])
    setMatchedPairs([])
    setMoves(0)
    setGameTime(0)
    setGameState('playing')
    setTimeStarted(Date.now())
  }

  const handleCardClick = (cardId) => {
    if (gameState !== 'playing' || flippedCards.length >= 2) return
    
    const card = cards.find(c => c.id === cardId)
    if (card.isFlipped || card.isMatched) return

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    )
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards.find(c => c.id === firstId)
      const secondCard = newCards.find(c => c.id === secondId)

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        const updatedCards = newCards.map(c => 
          c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
        )
        setCards(updatedCards)
        setMatchedPairs(prev => [...prev, firstCard.emoji])
        setFlippedCards([])

        // Check if game is won
        const pairCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10
        if (matchedPairs.length + 1 >= pairCount) {
          const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000)
          setGameTime(timeElapsed)
          setGameState('won')
          
          // Update best score
          if (bestScore === '∞' || moves + 1 < parseInt(bestScore)) {
            setBestScore((moves + 1).toString())
            localStorage.setItem('memoryGameBestScore', (moves + 1).toString())
          }
          
          // Add to history
          setGameHistory(prev => [{
            difficulty: difficulty,
            moves: moves + 1,
            time: timeElapsed,
            timestamp: new Date().toLocaleDateString()
          }, ...prev.slice(0, 9)]) // Keep last 10 games
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          const resetCards = cards.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setGameState('waiting')
    setCards([])
    setFlippedCards([])
    setMatchedPairs([])
    setMoves(0)
    setGameTime(0)
  }

  const resetScore = () => {
    setBestScore('∞')
    localStorage.removeItem('memoryGameBestScore')
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

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'easy': return { pairs: 6, gridCols: 4, gridRows: 3 }
      case 'medium': return { pairs: 8, gridCols: 4, gridRows: 4 }
      case 'hard': return { pairs: 10, gridCols: 5, gridRows: 4 }
      default: return { pairs: 6, gridCols: 4, gridRows: 3 }
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
        🃏 Memory Card Game
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
          <div style={{ fontWeight: 'bold' }}>Best Score</div>
          <div>{bestScore}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Moves</div>
          <div>{moves}</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Time</div>
          <div>{gameTime}s</div>
        </div>
        <div style={{ color: '#9c88ff', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Pairs Found</div>
          <div>{matchedPairs.length}/{config.pairs}</div>
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
              <option value="easy">Easy (6 pairs)</option>
              <option value="medium">Medium (8 pairs)</option>
              <option value="hard">Hard (10 pairs)</option>
            </select>
          </div>
          
          <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Find all matching pairs of cards! Test your memory skills.
          </p>
          
          <button
            onClick={initializeGame}
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
            {gameState === 'won' ? '🎉 Congratulations! You found all pairs!' : `Find the matching pairs - ${matchedPairs.length}/${config.pairs} found`}
          </div>

          {/* Game Board */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.gridCols}, 1fr)`,
            gap: '10px',
            marginBottom: '2rem',
            justifyContent: 'center',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || gameState !== 'playing'}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '2px solid #00d4aa',
                  background: card.isMatched 
                    ? 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'
                    : card.isFlipped 
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  color: card.isMatched ? 'white' : '#333',
                  fontSize: '2rem',
                  cursor: card.isMatched || gameState !== 'playing' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '10px',
                  transform: card.isFlipped || card.isMatched ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => {
                  if (!card.isMatched && gameState === 'playing') {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!card.isMatched && gameState === 'playing') {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = 'none'
                  }
                }}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '❓'}
              </button>
            ))}
          </div>

          {/* Game Over Actions */}
          {gameState === 'won' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={initializeGame}
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
                <span style={{ color: '#9c88ff' }}>🎯 {game.difficulty}</span>
                <span style={{ color: '#ffd93d' }}>📊 {game.moves} moves</span>
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

export default MemoryGame
