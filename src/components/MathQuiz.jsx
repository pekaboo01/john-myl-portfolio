import React, { useState, useEffect } from 'react'

const MathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [gameState, setGameState] = useState('waiting') // waiting, playing, finished
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(10)
  const [timeStarted, setTimeStarted] = useState(null)
  const [gameTime, setGameTime] = useState(0)
  const [bestScore, setBestScore] = useState(localStorage.getItem('mathQuizBestScore') || 0)
  const [bestAccuracy, setBestAccuracy] = useState(localStorage.getItem('mathQuizBestAccuracy') || 0)
  const [gameHistory, setGameHistory] = useState([])
  const [difficulty, setDifficulty] = useState('easy') // easy, medium, hard
  const [questionType, setQuestionType] = useState('mixed') // mixed, addition, subtraction, multiplication, division
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const generateQuestion = () => {
    let num1, num2, operation, answer, questionText
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
        break
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 10
        num2 = Math.floor(Math.random() * 50) + 10
        break
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 50
        num2 = Math.floor(Math.random() * 100) + 50
        break
      default:
        num1 = Math.floor(Math.random() * 20) + 1
        num2 = Math.floor(Math.random() * 20) + 1
    }

    if (questionType === 'mixed') {
      const operations = ['+', '-', '*', '/']
      operation = operations[Math.floor(Math.random() * operations.length)]
    } else {
      switch (questionType) {
        case 'addition': operation = '+'; break
        case 'subtraction': operation = '-'; break
        case 'multiplication': operation = '*'; break
        case 'division': operation = '/'; break
        default: operation = '+'
      }
    }

    // Ensure division results in whole numbers for easy/medium
    if (operation === '/') {
      if (difficulty === 'easy') {
        num2 = Math.floor(Math.random() * 10) + 1
        num1 = num2 * (Math.floor(Math.random() * 10) + 1)
      } else if (difficulty === 'medium') {
        num2 = Math.floor(Math.random() * 15) + 1
        num1 = num2 * (Math.floor(Math.random() * 15) + 1)
      }
    }

    // Calculate answer
    switch (operation) {
      case '+': answer = num1 + num2; break
      case '-': answer = num1 - num2; break
      case '*': answer = num1 * num2; break
      case '/': answer = num1 / num2; break
      default: answer = num1 + num2
    }

    // Format question text
    const operationSymbols = { '+': '+', '-': '-', '*': '×', '/': '÷' }
    questionText = `${num1} ${operationSymbols[operation]} ${num2} = ?`

    return {
      num1,
      num2,
      operation,
      answer,
      questionText
    }
  }

  const startQuiz = () => {
    const firstQuestion = generateQuestion()
    setCurrentQuestion(firstQuestion)
    setUserAnswer('')
    setGameState('playing')
    setScore(0)
    setQuestionNumber(1)
    setStreak(0)
    setMaxStreak(0)
    setTimeStarted(Date.now())
    setGameTime(0)
  }

  const checkAnswer = () => {
    if (!userAnswer || gameState !== 'playing') return
    
    const userNum = parseFloat(userAnswer)
    const isCorrect = Math.abs(userNum - currentQuestion.answer) < 0.01
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      setStreak(prev => {
        const newStreak = prev + 1
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak)
        }
        return newStreak
      })
    } else {
      setStreak(0)
    }

    // Move to next question or end quiz
    if (questionNumber < totalQuestions) {
      const nextQuestion = generateQuestion()
      setCurrentQuestion(nextQuestion)
      setUserAnswer('')
      setQuestionNumber(prev => prev + 1)
    } else {
      // Quiz finished
      const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000)
      setGameTime(timeElapsed)
      
      const accuracy = Math.round((score / totalQuestions) * 100)
      
      // Update best scores
      if (score > bestScore) {
        setBestScore(score)
        localStorage.setItem('mathQuizBestScore', score.toString())
      }
      
      if (accuracy > bestAccuracy) {
        setBestAccuracy(accuracy)
        localStorage.setItem('mathQuizBestAccuracy', accuracy.toString())
      }
      
      // Add to history
      setGameHistory(prev => [{
        difficulty: difficulty,
        questionType: questionType,
        score: score,
        totalQuestions: totalQuestions,
        accuracy: accuracy,
        time: timeElapsed,
        maxStreak: maxStreak,
        timestamp: new Date().toLocaleDateString()
      }, ...prev.slice(0, 9)]) // Keep last 10 games
      
      setGameState('finished')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  const resetQuiz = () => {
    setGameState('waiting')
    setCurrentQuestion(null)
    setUserAnswer('')
    setScore(0)
    setQuestionNumber(0)
    setStreak(0)
    setMaxStreak(0)
    setTimeStarted(null)
    setGameTime(0)
  }

  const resetScores = () => {
    setBestScore(0)
    setBestAccuracy(0)
    localStorage.removeItem('mathQuizBestScore')
    localStorage.removeItem('mathQuizBestAccuracy')
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
      case 'easy': return { maxNum: 20, operations: ['+', '-', '*', '/'] }
      case 'medium': return { maxNum: 50, operations: ['+', '-', '*', '/'] }
      case 'hard': return { maxNum: 100, operations: ['+', '-', '*', '/'] }
      default: return { maxNum: 20, operations: ['+', '-', '*', '/'] }
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
        ➗ Math Quiz
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
          <div>{bestScore}/{totalQuestions}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Best Accuracy</div>
          <div>{bestAccuracy}%</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Current Score</div>
          <div>{score}/{totalQuestions}</div>
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
                fontSize: '1rem',
                marginRight: '1rem'
              }}
            >
              <option value="easy">Easy (1-20)</option>
              <option value="medium">Medium (10-60)</option>
              <option value="hard">Hard (50-150)</option>
            </select>
            
            <label style={{ color: '#ccc', fontSize: '1.1rem' }}>Question Type:</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
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
              <option value="mixed">Mixed Operations</option>
              <option value="addition">Addition Only</option>
              <option value="subtraction">Subtraction Only</option>
              <option value="multiplication">Multiplication Only</option>
              <option value="division">Division Only</option>
            </select>
          </div>
          
          <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Test your math skills! Solve {totalQuestions} questions as quickly and accurately as you can.
          </p>
          
          <button
            onClick={startQuiz}
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
            🚀 Start Quiz!
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
            color: gameState === 'finished' ? '#00d4aa' : '#ccc',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            {gameState === 'finished' ? '🎉 Quiz Complete!' : `Question ${questionNumber} of ${totalQuestions}`}
          </div>

          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(questionNumber - 1) / totalQuestions * 100}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          )}

          {/* Current Score and Streak */}
          {gameState === 'playing' && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ color: '#00d4aa', fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 'bold' }}>Score:</span> {score}/{totalQuestions}
              </div>
              <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 'bold' }}>Streak:</span> {streak}
              </div>
              <div style={{ color: '#9c88ff', fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 'bold' }}>Max Streak:</span> {maxStreak}
              </div>
            </div>
          )}

          {/* Question */}
          {gameState === 'playing' && currentQuestion && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: '3rem',
              marginBottom: '2rem',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '3rem',
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '2rem'
              }}>
                {currentQuestion.questionText}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your answer"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1.5rem',
                    borderRadius: '10px',
                    border: '2px solid #00d4aa',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: 'white',
                    width: '200px',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                  step="any"
                />
                
                <button
                  onClick={checkAnswer}
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '10px',
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
                  🎯 Submit
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {gameState === 'finished' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'rgba(0, 212, 170, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #00d4aa'
              }}>
                <div style={{ color: '#00d4aa', fontSize: '2rem', fontWeight: 'bold' }}>{score}</div>
                <div style={{ color: '#ccc' }}>Correct Answers</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 217, 61, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #ffd93d'
              }}>
                <div style={{ color: '#ffd93d', fontSize: '2rem', fontWeight: 'bold' }}>{Math.round((score / totalQuestions) * 100)}%</div>
                <div style={{ color: '#ccc' }}>Accuracy</div>
              </div>
              
              <div style={{
                background: 'rgba(156, 136, 255, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #9c88ff'
              }}>
                <div style={{ color: '#9c88ff', fontSize: '2rem', fontWeight: 'bold' }}>{maxStreak}</div>
                <div style={{ color: '#ccc' }}>Max Streak</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #ff6b6b'
              }}>
                <div style={{ color: '#ff6b6b', fontSize: '2rem', fontWeight: 'bold' }}>{gameTime}s</div>
                <div style={{ color: '#ccc' }}>Time</div>
              </div>
            </div>
          )}

          {/* Game Over Actions */}
          {gameState === 'finished' && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={startQuiz}
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
                🎮 Try Again
              </button>
              <button
                onClick={resetQuiz}
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
            onClick={resetQuiz}
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
            🔄 Reset Quiz
          </button>
        )}
        <button
          onClick={resetScores}
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
          🏆 Reset Scores
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
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Recent Quizzes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {gameHistory.map((quiz, index) => (
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
                <span style={{ color: '#9c88ff' }}>🎯 {quiz.difficulty}</span>
                <span style={{ color: '#00d4aa' }}>📊 {quiz.score}/{quiz.totalQuestions}</span>
                <span style={{ color: '#ffd93d' }}>📈 {quiz.accuracy}%</span>
                <span style={{ color: '#ff6b6b' }}>🔥 {quiz.maxStreak}</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{quiz.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MathQuiz
