import React, { useState, useEffect, useCallback, useRef } from 'react'

const SnakeGame = () => {
  const [gameState, setGameState] = useState('idle') // idle, playing, paused, gameOver
  const [snake, setSnake] = useState([[10, 10]])
  const [food, setFood] = useState([15, 15])
  const [direction, setDirection] = useState([0, 0])
  const [score, setScore] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(150)
  const gameLoopRef = useRef(null)
  const boardSize = 20

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize)
    ]
    setFood(newFood)
  }, [])

  // Check if position is valid (not hitting walls or snake)
  const isValidPosition = useCallback((pos) => {
    const [x, y] = pos
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return false
    
    return !snake.some(segment => segment[0] === x && segment[1] === y)
  }, [snake])

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing' || direction[0] === 0 && direction[1] === 0) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = [...newSnake[0]]
      head[0] += direction[0]
      head[1] += direction[1]

      // Check wall collision
      if (head[0] < 0) head[0] = boardSize - 1
      if (head[0] >= boardSize) head[0] = 0
      if (head[1] < 0) head[1] = boardSize - 1
      if (head[1] >= boardSize) head[1] = 0

      // Check self collision
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameState('gameOver')
        return prevSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10)
        generateFood()
        // Increase speed every 50 points
        if (score % 50 === 0 && gameSpeed > 50) {
          setGameSpeed(prev => prev - 10)
        }
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [gameState, direction, food, score, gameSpeed, generateFood])

  // Handle key presses
  const handleKeyPress = useCallback((e) => {
    if (gameState !== 'playing') return

    e.preventDefault() // Prevent page scrolling
    
    const key = e.key
    let newDirection = [...direction]

    switch (key) {
      case 'ArrowUp':
        if (direction[1] !== 1) newDirection = [0, -1]
        break
      case 'ArrowDown':
        if (direction[1] !== -1) newDirection = [0, 1]
        break
      case 'ArrowLeft':
        if (direction[0] !== 1) newDirection = [-1, 0]
        break
      case 'ArrowRight':
        if (direction[0] !== -1) newDirection = [1, 0]
        break
      default:
        return
    }

    setDirection(newDirection)
  }, [gameState, direction])

  // Start game
  const startGame = () => {
    setSnake([[10, 10]])
    setDirection([0, 0])
    setScore(0)
    setGameSpeed(150)
    setGameState('playing')
    generateFood()
  }

  // Pause/Resume game
  const togglePause = () => {
    if (gameState === 'playing') {
      setGameState('paused')
    } else if (gameState === 'paused') {
      setGameState('playing')
    }
  }

  // Reset game
  const resetGame = () => {
    setSnake([[10, 10]])
    setDirection([0, 0])
    setScore(0)
    setGameSpeed(150)
    setGameState('idle')
    setFood([15, 15])
  }

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, gameSpeed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState, gameSpeed, moveSnake])

  // Keyboard event listener
  useEffect(() => {
    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameState, handleKeyPress])

  // Render game board
  const renderBoard = () => {
    const board = []
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const isSnake = snake.some(segment => segment[0] === x && segment[1] === y)
        const isFood = food[0] === x && food[1] === y
        const isHead = snake[0] && snake[0][0] === x && snake[0][1] === y

        let cellClass = 'game-cell'
        if (isSnake) cellClass += ' snake'
        if (isHead) cellClass += ' snake-head'
        if (isFood) cellClass += ' food'

        board.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            style={{
              left: `${(x / boardSize) * 100}%`,
              top: `${(y / boardSize) * 100}%`
            }}
          />
        )
      }
    }
    return board
  }

  return (
    <div className="snake-game">
      <div className="game-header">
        <h3>🐍 Tech Snake</h3>
        <div className="game-info">
          <span className="score">Score: {score}</span>
          {gameState === 'idle' && (
            <button className="start-btn btn-ripple" onClick={startGame}>
              Start Game
            </button>
          )}
          {gameState === 'playing' && (
            <button className="pause-btn btn-ripple" onClick={togglePause}>
              Pause
            </button>
          )}
          {gameState === 'paused' && (
            <button className="resume-btn btn-ripple" onClick={togglePause}>
              Resume
            </button>
          )}
          {gameState === 'gameOver' && (
            <button className="reset-btn btn-ripple" onClick={resetGame}>
              Play Again
            </button>
          )}
        </div>
      </div>
      
      <div className="game-container">
        <div className="game-board">
          {gameState === 'idle' && (
            <div className="game-instructions">
              <p>Press Start to begin</p>
              <p>Use arrow keys to move</p>
              <p>Eat the code symbols to grow!</p>
            </div>
          )}
          
          {gameState === 'paused' && (
            <div className="game-paused">
              <p>Game Paused</p>
              <p>Press Resume to continue</p>
            </div>
          )}
          
          {gameState === 'gameOver' && (
            <div className="game-over">
              <p>Game Over!</p>
              <p>Final Score: {score}</p>
            </div>
          )}
          
          {(gameState === 'playing' || gameState === 'paused') && (
            <div className="game-grid">
              {renderBoard()}
            </div>
          )}
        </div>
      </div>
      
      <div className="game-controls">
        <p className="controls-info">
          <strong>Controls:</strong> Arrow Keys to move • Space to pause/resume
        </p>
      </div>
    </div>
  )
}

export default SnakeGame
