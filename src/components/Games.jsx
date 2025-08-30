import React, { useState } from 'react'
import SnakeGame from './SnakeGame'
import './Games.css'

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 'snake',
      title: '🐍 Tech Snake',
      description: 'Classic snake game with a tech twist. Navigate through the grid, eat code symbols, and grow your snake while avoiding collisions.',
      difficulty: 'Easy',
      category: 'Arcade',
      component: SnakeGame,
      isActive: true
    },
    {
      id: 'tetris',
      title: '🧩 Tech Tetris',
      description: 'Coming soon! Stack falling code blocks and clear lines in this programming-themed version of the classic puzzle game.',
      difficulty: 'Medium',
      category: 'Puzzle',
      component: null,
      isActive: false
    },
    {
      id: 'memory',
      title: '🧠 Code Memory',
      description: 'Coming soon! Test your memory by matching programming language logos and syntax patterns.',
      difficulty: 'Easy',
      category: 'Memory',
      component: null,
      isActive: false
    },
    {
      id: 'typing',
      title: '⌨️ Speed Typing',
      description: 'Coming soon! Improve your coding speed by typing code snippets as fast as you can.',
      difficulty: 'Medium',
      category: 'Skill',
      component: null,
      isActive: false
    },
    {
      id: 'quiz',
      title: '❓ Dev Quiz',
      description: 'Coming soon! Test your programming knowledge with interactive coding challenges and trivia.',
      difficulty: 'Hard',
      category: 'Educational',
      component: null,
      isActive: false
    },
    {
      id: 'breakout',
      title: '🏓 Code Breakout',
      description: 'Coming soon! Break through walls of code blocks using your paddle and ball in this arcade classic.',
      difficulty: 'Medium',
      category: 'Arcade',
      component: null,
      isActive: false
    }
  ]

  const handleGameSelect = (game) => {
    if (game.isActive) {
      setSelectedGame(game)
    }
  }

  const closeGame = () => {
    setSelectedGame(null)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#00d4aa'
      case 'Medium': return '#ffa500'
      case 'Hard': return '#ff3b30'
      default: return '#00d4aa'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Arcade': return '#00d4aa'
      case 'Puzzle': return '#ff6b6b'
      case 'Memory': return '#4ecdc4'
      case 'Skill': return '#45b7d1'
      case 'Educational': return '#96ceb4'
      default: return '#00d4aa'
    }
  }

  return (
    <section id="games" className="section games">
      <div className="particles"></div>
      
      <div className="container">
        <div className="games-header fade-in">
          <h2 className="games-title">Games & Challenges</h2>
          <p className="games-subtitle">
            Take a break and enjoy some interactive games! Test your skills, challenge your mind, and have fun while exploring my portfolio.
          </p>
        </div>

        {selectedGame ? (
          <div className="game-modal fade-in">
            <div className="game-modal-header">
              <h3>{selectedGame.title}</h3>
              <button className="close-game-btn" onClick={closeGame}>
                ✕
              </button>
            </div>
            <div className="game-modal-content">
              <selectedGame.component />
            </div>
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game, index) => (
              <div 
                key={game.id} 
                className={`game-card fade-in stagger-${(index % 5) + 1} ${!game.isActive ? 'coming-soon' : ''}`}
                onClick={() => handleGameSelect(game)}
              >
                <div className="game-card-header">
                  <h3 className="game-card-title">{game.title}</h3>
                  <div className="game-badges">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                    >
                      {game.difficulty}
                    </span>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(game.category) }}
                    >
                      {game.category}
                    </span>
                  </div>
                </div>
                
                <p className="game-card-description">{game.description}</p>
                
                <div className="game-card-footer">
                  {game.isActive ? (
                    <button className="play-game-btn btn btn-ripple">
                      🎮 Play Now
                    </button>
                  ) : (
                    <button className="coming-soon-btn" disabled>
                      🚧 Coming Soon
                    </button>
                  )}
                </div>
                
                {!game.isActive && (
                  <div className="coming-soon-overlay">
                    <span>🚧</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Games
