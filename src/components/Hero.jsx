import React, { useState, useEffect, useCallback } from 'react'
import './Hero.css'

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]])
  const [food, setFood] = useState([5, 5])
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const gameBoardSize = 20
  const cellSize = 15

  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * gameBoardSize),
      Math.floor(Math.random() * gameBoardSize)
    ]
    setFood(newFood)
  }, [])

  const resetGame = () => {
    setSnake([[0, 0]])
    setDirection('RIGHT')
    setGameOver(false)
    setScore(0)
    generateFood()
    setGameStarted(false)
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = [...newSnake[0]]

      switch (direction) {
        case 'UP':
          head[1] = head[1] - 1
          break
        case 'DOWN':
          head[1] = head[1] + 1
          break
        case 'LEFT':
          head[0] = head[0] - 1
          break
        case 'RIGHT':
          head[0] = head[0] + 1
          break
        default:
          break
      }

      // Check wall collision
      if (head[0] < 0 || head[0] >= gameBoardSize || head[1] < 0 || head[1] >= gameBoardSize) {
        setGameOver(true)
        return prevSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10)
        generateFood()
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameStarted, gameOver, generateFood])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameStarted])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameInterval = setInterval(moveSnake, 150)
      return () => clearInterval(gameInterval)
    }
  }, [moveSnake, gameStarted, gameOver])

  const renderGameBoard = () => {
    const board = []
    for (let y = 0; y < gameBoardSize; y++) {
      for (let x = 0; x < gameBoardSize; x++) {
        const isSnake = snake.some(segment => segment[0] === x && segment[1] === y)
        const isFood = food[0] === x && food[1] === y
        const isHead = snake[0][0] === x && snake[0][1] === y

        let cellClass = 'game-cell'
        if (isSnake) cellClass += isHead ? ' snake-head' : ' snake-body'
        if (isFood) cellClass += ' food'

        board.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            style={{
              left: x * cellSize,
              top: y * cellSize,
              width: cellSize,
              height: cellSize
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
          {!gameStarted && (
            <button className="start-btn" onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      </div>
      
      <div className="game-container">
        <div 
          className="game-board"
          style={{
            width: gameBoardSize * cellSize,
            height: gameBoardSize * cellSize
          }}
        >
          {renderGameBoard()}
        </div>
        
        {gameOver && (
          <div className="game-over">
            <h4>Game Over!</h4>
            <p>Final Score: {score}</p>
            <button className="restart-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
        
        {!gameStarted && !gameOver && (
          <div className="game-instructions">
            <p>Use arrow keys to play</p>
            <p>Eat the code symbols to grow!</p>
          </div>
        )}
      </div>
    </div>
  )
}

const Hero = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  
  const greetings = [
    { text: 'Hi', lang: 'English' },
    { text: 'Hola', lang: 'Spanish' },
    { text: 'Bonjour', lang: 'French' },
    { text: 'Ciao', lang: 'Italian' },
    { text: 'Hallo', lang: 'German' },
    { text: 'こんにちは', lang: 'Japanese' },
    { text: '안녕하세요', lang: 'Korean' },
    { text: '你好', lang: 'Chinese' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [greetings.length])

  return (
    <section id="home" className="section hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting-container">
              <span className="greeting">{greetings[currentGreeting].text}</span>
              <span className="greeting-lang">({greetings[currentGreeting].lang})</span>
            </div>
            
            <h1 className="hero-name">
              I'm <span className="name-highlight">John Myl Alinsonorin</span>
            </h1>
            
            <h2 className="hero-title">Software Engineer</h2>
            
            <p className="hero-description">
              A software engineer who loves learning and creating things that make life a little easier. 
              I'm not good at everything but I'm always curious and open to improving myself along the way. 
              I enjoy working with others, sharing ideas, and finding solutions together. For me, every project is 
              not just about building software but also about growing as a person and helping in any way I can.
            </p>
            
            {/* Removed Let's Talk button */}
          </div>
          
          <div className="hero-visual">
            <SnakeGame />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
