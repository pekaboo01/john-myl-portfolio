import React, { useState, useEffect } from 'react'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameState, setGameState] = useState('playing') // playing, won, draw
  const [winner, setWinner] = useState(null)
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 })
  const [gameHistory, setGameHistory] = useState([])
  const [aiDifficulty, setAiDifficulty] = useState('easy') // easy, medium

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ]

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const checkDraw = (squares) => {
    return squares.every(square => square !== null)
  }

  const getBestMove = (squares, player) => {
    if (aiDifficulty === 'easy') {
      // Random move for easy difficulty
      const emptySquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null)
      return emptySquares[Math.floor(Math.random() * emptySquares.length)]
    } else {
      // Minimax algorithm for medium difficulty
      let bestScore = player === 'O' ? -Infinity : Infinity
      let bestMove = null

      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = player
          let score = minimax(squares, 0, player === 'O' ? false : true)
          squares[i] = null

          if (player === 'O') {
            if (score > bestScore) {
              bestScore = score
              bestMove = i
            }
          } else {
            if (score < bestScore) {
              bestScore = score
              bestMove = i
            }
          }
        }
      }
      return bestMove
    }
  }

  const minimax = (squares, depth, isMaximizing) => {
    const winner = checkWinner(squares)
    if (winner === 'O') return 10 - depth
    if (winner === 'X') return depth - 10
    if (checkDraw(squares)) return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O'
          let score = minimax(squares, depth + 1, false)
          squares[i] = null
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X'
          let score = minimax(squares, depth + 1, true)
          squares[i] = null
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  const handleClick = (index) => {
    if (board[index] || gameState !== 'playing') return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsXNext(false)

    // Check for winner after player move
    const playerWinner = checkWinner(newBoard)
    if (playerWinner) {
      setWinner(playerWinner)
      setGameState('won')
      updateScore(playerWinner)
      addToHistory(newBoard, playerWinner)
      return
    }

    if (checkDraw(newBoard)) {
      setGameState('draw')
      updateScore('draw')
      addToHistory(newBoard, 'draw')
      return
    }

    // AI move
    setTimeout(() => {
      const aiMove = getBestMove(newBoard, 'O')
      if (aiMove !== null) {
        newBoard[aiMove] = 'O'
        setBoard([...newBoard])
        setIsXNext(true)

        // Check for winner after AI move
        const aiWinner = checkWinner(newBoard)
        if (aiWinner) {
          setWinner(aiWinner)
          setGameState('won')
          updateScore(aiWinner)
          addToHistory(newBoard, aiWinner)
          return
        }

        if (checkDraw(newBoard)) {
          setGameState('draw')
          updateScore('draw')
          addToHistory(newBoard, 'draw')
        }
      }
    }, 500)
  }

  const updateScore = (result) => {
    setScore(prev => ({
      ...prev,
      [result === 'draw' ? 'draws' : result]: prev[result === 'draw' ? 'draws' : result] + 1
    }))
  }

  const addToHistory = (finalBoard, result) => {
    setGameHistory(prev => [{
      board: finalBoard,
      result: result,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 9)]) // Keep last 10 games
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameState('playing')
    setWinner(null)
  }

  const resetScore = () => {
    setScore({ X: 0, O: 0, draws: 0 })
    setGameHistory([])
  }

  const renderSquare = (index) => (
    <button
      key={index}
      onClick={() => handleClick(index)}
      disabled={board[index] || gameState !== 'playing'}
      style={{
        width: '80px',
        height: '80px',
        border: '2px solid #00d4aa',
        background: 'rgba(0, 0, 0, 0.3)',
        color: board[index] === 'X' ? '#00d4aa' : '#ff6b6b',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        cursor: board[index] || gameState !== 'playing' ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '10px'
      }}
      onMouseEnter={(e) => {
        if (!board[index] && gameState === 'playing') {
          e.target.style.background = 'rgba(0, 212, 170, 0.1)'
          e.target.style.transform = 'scale(1.05)'
        }
      }}
      onMouseLeave={(e) => {
        if (!board[index] && gameState === 'playing') {
          e.target.style.background = 'rgba(0, 0, 0, 0.3)'
          e.target.style.transform = 'scale(1)'
        }
      }}
    >
      {board[index]}
    </button>
  )

  const getStatusMessage = () => {
    if (gameState === 'won') {
      return `🎉 ${winner} Wins!`
    } else if (gameState === 'draw') {
      return '🤝 It\'s a Draw!'
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`
    }
  }

  const getStatusColor = () => {
    if (gameState === 'won') return '#00d4aa'
    if (gameState === 'draw') return '#ffd93d'
    return isXNext ? '#00d4aa' : '#ff6b6b'
  }

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
        ❌⭕ Tic-Tac-Toe
      </h2>

      {/* Score Board */}
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
          <div style={{ fontWeight: 'bold' }}>X (You)</div>
          <div>{score.X}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Draws</div>
          <div>{score.draws}</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>O (AI)</div>
          <div>{score.O}</div>
        </div>
      </div>

      {/* AI Difficulty */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px'
      }}>
        <label style={{ color: '#ccc', marginRight: '1rem' }}>AI Difficulty:</label>
        <select
          value={aiDifficulty}
          onChange={(e) => setAiDifficulty(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            border: '1px solid #00d4aa',
            cursor: 'pointer'
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
        </select>
      </div>

      {/* Game Status */}
      <div style={{
        fontSize: '1.5rem',
        color: getStatusColor(),
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        fontWeight: 'bold'
      }}>
        {getStatusMessage()}
      </div>

      {/* Game Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        {board.map((square, index) => renderSquare(index))}
      </div>

      {/* Game Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <button
          onClick={resetGame}
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
          🎮 New Game
        </button>
        <button
          onClick={resetScore}
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
          🔄 Reset Score
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
                <span style={{
                  color: game.result === 'X' ? '#00d4aa' : 
                         game.result === 'O' ? '#ff6b6b' : '#ffd93d',
                  fontWeight: 'bold'
                }}>
                  {game.result === 'draw' ? '🤝 Draw' : `${game.result} Wins`}
                </span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{game.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TicTacToe
