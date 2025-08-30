import React, { useState } from 'react'
import SnakeGame from '../components/SnakeGame'
import PalindromeGame from '../components/PalindromeGame'
import RockPaperScissors from '../components/RockPaperScissors'
import NumberGuessingGame from '../components/NumberGuessingGame'
import TicTacToe from '../components/TicTacToe'
import MemoryGame from '../components/MemoryGame'
import ColorMixer from '../components/ColorMixer'
import TypingSpeedTest from '../components/TypingSpeedTest'
import MathQuiz from '../components/MathQuiz'

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 'snake',
      title: '🐍 Tech Snake',
      description: 'Classic snake game with a tech twist. Navigate through the grid, eat code symbols, and grow your snake while avoiding collisions.',
      difficulty: 'Easy',
      category: 'Arcade',
      component: SnakeGame,
      color: '#00d4aa'
    },
    {
      id: 'palindrome',
      title: '🔄 Palindrome Checker',
      description: 'Check if words or phrases are palindromes! Test your knowledge with examples and learn how palindromes work.',
      difficulty: 'Easy',
      category: 'Puzzle',
      component: PalindromeGame,
      color: '#ff6b6b'
    },
    {
      id: 'rps',
      title: '✂️ Rock, Paper, Scissors',
      description: 'Classic hand game against the computer! Choose your weapon and see if you can outsmart the AI. Track your wins and game history.',
      difficulty: 'Easy',
      category: 'Strategy',
      component: RockPaperScissors,
      color: '#ffd93d'
    },
    {
      id: 'number-guessing',
      title: '🎯 Number Guessing Game',
      description: 'I\'m thinking of a number between 1 and 100. Can you guess it? Get hints and try to beat your best score!',
      difficulty: 'Easy',
      category: 'Logic',
      component: NumberGuessingGame,
      color: '#9c88ff'
    },
    {
      id: 'tictactoe',
      title: '❌⭕ Tic-Tac-Toe',
      description: 'Classic 3x3 grid game with AI opponent! Choose between easy and medium difficulty. Can you beat the computer?',
      difficulty: 'Medium',
      category: 'Strategy',
      component: TicTacToe,
      color: '#ff7675'
    },
    {
      id: 'memory',
      title: '🃏 Memory Card Game',
      description: 'Test your memory by finding matching pairs of cards! Three difficulty levels with different numbers of pairs to challenge your skills.',
      difficulty: 'Easy',
      category: 'Memory',
      component: MemoryGame,
      color: '#fdcb6e'
    },
    {
      id: 'color-mixer',
      title: '🎨 Color Mixer',
      description: 'Mix RGB colors to match target colors! Learn color theory and improve your color perception with three difficulty levels.',
      difficulty: 'Easy',
      category: 'Creative',
      component: ColorMixer,
      color: '#e84393'
    },
    {
      id: 'typing-test',
      title: '⌨️ Typing Speed Test',
      description: 'Test your typing speed and accuracy! Choose from different text types and difficulty levels to improve your keyboard skills.',
      difficulty: 'Easy',
      category: 'Skill',
      component: TypingSpeedTest,
      color: '#6c5ce7'
    },
    {
      id: 'math-quiz',
      title: '➗ Math Quiz',
      description: 'Challenge your mathematical skills! Solve arithmetic problems with different operations and difficulty levels.',
      difficulty: 'Easy',
      category: 'Educational',
      component: MathQuiz,
      color: '#fd79a8'
    }
  ]

  const handleGameSelect = (game) => {
    setSelectedGame(game)
  }

  const closeGame = () => {
    setSelectedGame(null)
  }

  const goBackToPortfolio = () => {
    window.location.href = '/'
  }

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <button 
            onClick={closeGame}
            style={{
              background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '30px',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0, 212, 170, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(0, 212, 170, 0.3)'
            }}
          >
            ← Back to Games
          </button>
          
          <h1 style={{ 
            color: 'white', 
            marginBottom: '30px',
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {selectedGame.title}
          </h1>
          
          <div style={{
            background: 'rgba(17, 17, 17, 0.8)',
            border: '1px solid rgba(0, 212, 170, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}>
            <GameComponent />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      {/* Centered Back Button */}
      <button 
        onClick={goBackToPortfolio}
        style={{
          background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0, 212, 170, 0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'fixed',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateX(-50%) translateY(-2px)'
          e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateX(-50%) translateY(0)'
          e.target.style.boxShadow = '0 4px 15px rgba(0, 212, 170, 0.3)'
        }}
      >
        ← Back to Portfolio
      </button>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          marginTop: '6rem'
        }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '4rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎮 Games & Challenges
          </h1>
          
          <p style={{
            color: '#ccc',
            fontSize: '1.3rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: '0.9'
          }}>
            Take a break and enjoy some interactive games! Test your skills, challenge your mind, and have fun.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {games.map((game, index) => (
            <div 
              key={game.id}
              onClick={() => handleGameSelect(game)}
              style={{
                background: 'rgba(17, 17, 17, 0.8)',
                border: `2px solid ${game.color}`,
                borderRadius: '20px',
                padding: '2.5rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${game.color}20`
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px) scale(1.02)'
                e.target.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${game.color}40`
                e.target.style.borderColor = game.color
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)'
                e.target.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${game.color}20`
              }}
            >
              {/* Difficulty Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: game.color,
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {game.difficulty}
              </div>
              
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ccc',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {game.category}
              </div>
              
              <h3 style={{
                color: 'white',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontWeight: '700',
                marginTop: '2rem'
              }}>
                {game.title}
              </h3>
              
              <p style={{
                color: '#ccc',
                marginBottom: '2.5rem',
                lineHeight: '1.7',
                fontSize: '1.1rem',
                opacity: '0.9'
              }}>
                {game.description}
              </p>
              
              <button style={{
                background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}dd 100%)`,
                color: 'white',
                border: 'none',
                padding: '15px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: `0 8px 25px ${game.color}40`
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = `0 12px 35px ${game.color}60`
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = `0 8px 25px ${game.color}40`
              }}
              >
                🎮 Play Now
              </button>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '2rem'
        }}>
          <p style={{
            color: '#888',
            fontSize: '1rem',
            opacity: '0.7'
          }}>
            More games coming soon! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default GamesPage
