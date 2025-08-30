import React, { useState, useEffect } from 'react'

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('')
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 })
  const [gameHistory, setGameHistory] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)

  const choices = [
    { name: 'rock', emoji: '🪨', beats: 'scissors' },
    { name: 'paper', emoji: '📄', beats: 'scissors' },
    { name: 'scissors', emoji: '✂️', beats: 'paper' }
  ]

  const determineWinner = (player, computer) => {
    if (player === computer) return 'tie'
    if (choices.find(c => c.name === player)?.beats === computer) return 'player'
    return 'computer'
  }

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex].name
  }

  const handleChoice = (choice) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setPlayerChoice(choice)
    
    // Simulate computer thinking
    setTimeout(() => {
      const compChoice = getComputerChoice()
      setComputerChoice(compChoice)
      
      const gameResult = determineWinner(choice, compChoice)
      setResult(gameResult)
      
      // Update score
      setScore(prev => ({
        ...prev,
        [gameResult === 'tie' ? 'ties' : gameResult]: prev[gameResult === 'tie' ? 'ties' : gameResult] + 1
      }))
      
      // Add to history
      setGameHistory(prev => [{
        player: choice,
        computer: compChoice,
        result: gameResult,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]) // Keep last 10 games
      
      setIsAnimating(false)
    }, 1000)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setScore({ player: 0, computer: 0, ties: 0 })
    setGameHistory([])
  }

  const getResultMessage = () => {
    switch (result) {
      case 'player': return '🎉 You Win!'
      case 'computer': return '😔 Computer Wins!'
      case 'tie': return '🤝 It\'s a Tie!'
      default: return 'Choose your weapon!'
    }
  }

  const getResultColor = () => {
    switch (result) {
      case 'player': return '#00d4aa'
      case 'computer': return '#ff6b6b'
      case 'tie': return '#ffd93d'
      default: return '#ccc'
    }
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
        ✂️ Rock, Paper, Scissors
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
        <div style={{ color: '#00d4aa', fontSize: '1.2rem' }}>
          <div style={{ fontWeight: 'bold' }}>You</div>
          <div>{score.player}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.2rem' }}>
          <div style={{ fontWeight: 'bold' }}>Ties</div>
          <div>{score.ties}</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.2rem' }}>
          <div style={{ fontWeight: 'bold' }}>Computer</div>
          <div>{score.computer}</div>
        </div>
      </div>

      {/* Game Area */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '2rem',
        minHeight: '200px'
      }}>
        {/* Player Choice */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#00d4aa', marginBottom: '1rem' }}>You</h3>
          <div style={{
            fontSize: '4rem',
            opacity: playerChoice ? 1 : 0.3,
            transition: 'all 0.3s ease'
          }}>
            {playerChoice ? choices.find(c => c.name === playerChoice)?.emoji : '❓'}
          </div>
          <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
            {playerChoice ? choices.find(c => c.name === playerChoice)?.name : 'Choose'}
          </p>
        </div>

        {/* VS */}
        <div style={{
          fontSize: '2rem',
          color: '#888',
          opacity: isAnimating ? 0.5 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          {isAnimating ? '🤔' : '⚔️'}
        </div>

        {/* Computer Choice */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Computer</h3>
          <div style={{
            fontSize: '4rem',
            opacity: computerChoice ? 1 : 0.3,
            transition: 'all 0.3s ease'
          }}>
            {computerChoice ? choices.find(c => c.name === computerChoice)?.emoji : '❓'}
          </div>
          <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
            {computerChoice ? choices.find(c => c.name === computerChoice)?.name : 'Waiting'}
          </p>
        </div>
      </div>

      {/* Result */}
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: getResultColor(),
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getResultMessage()}
      </div>

      {/* Choice Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handleChoice(choice.name)}
            disabled={isAnimating}
            style={{
              background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 1.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isAnimating ? 0.6 : 1,
              transform: playerChoice === choice.name ? 'scale(1.1)' : 'scale(1)',
              boxShadow: playerChoice === choice.name ? '0 8px 25px rgba(0, 212, 170, 0.4)' : '0 4px 15px rgba(0, 212, 170, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isAnimating) {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 170, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnimating) {
                e.target.style.transform = playerChoice === choice.name ? 'scale(1.1)' : 'scale(1)'
                e.target.style.boxShadow = playerChoice === choice.name ? '0 8px 25px rgba(0, 212, 170, 0.4)' : '0 4px 15px rgba(0, 212, 170, 0.3)'
              }
            }}
          >
            {choice.emoji} {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
          color: 'white',
          border: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '10px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: '2rem'
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
                <span style={{ color: '#00d4aa' }}>
                  {choices.find(c => c.name === game.player)?.emoji} {game.player}
                </span>
                <span style={{ color: '#888' }}>vs</span>
                <span style={{ color: '#ff6b6b' }}>
                  {choices.find(c => c.name === game.computer)?.emoji} {game.computer}
                </span>
                <span style={{
                  color: game.result === 'player' ? '#00d4aa' : 
                         game.result === 'computer' ? '#ff6b6b' : '#ffd93d',
                  fontWeight: 'bold'
                }}>
                  {game.result === 'player' ? 'W' : game.result === 'computer' ? 'L' : 'T'}
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

export default RockPaperScissors
