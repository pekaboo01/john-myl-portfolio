import React, { useState, useEffect, useRef } from 'react'

const TypingSpeedTest = () => {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [gameState, setGameState] = useState('waiting') // waiting, playing, finished
  const [timeStarted, setTimeStarted] = useState(null)
  const [gameTime, setGameTime] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [errors, setErrors] = useState(0)
  const [bestWpm, setBestWpm] = useState(localStorage.getItem('typingBestWpm') || 0)
  const [bestAccuracy, setBestAccuracy] = useState(localStorage.getItem('typingBestAccuracy') || 0)
  const [gameHistory, setGameHistory] = useState([])
  const [difficulty, setDifficulty] = useState('easy') // easy, medium, hard
  const [textType, setTextType] = useState('random') // random, quotes, code
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(true)
  const inputRef = useRef(null)

  const texts = {
    easy: {
      random: [
        "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
        "Programming is the art of telling another human being what one wants the computer to do.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
      ],
      quotes: [
        "Be the change you wish to see in the world. - Mahatma Gandhi",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Life is what happens when you're busy making other plans. - John Lennon"
      ],
      code: [
        "function hello() { return 'Hello World'; }",
        "const name = 'John'; console.log(name);",
        "if (condition) { doSomething(); } else { doSomethingElse(); }"
      ]
    },
    medium: {
      random: [
        "In computer science, an algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of specific problems or to perform a computation.",
        "The Internet is a global system of interconnected computer networks that use the standard Internet protocol suite to link devices worldwide.",
        "Artificial intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals."
      ],
      quotes: [
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt"
      ],
      code: [
        "class Calculator { add(a, b) { return a + b; } subtract(a, b) { return a - b; } }",
        "const users = users.filter(user => user.active).map(user => user.name);",
        "try { const result = await fetch(url); const data = await result.json(); } catch (error) { console.error(error); }"
      ]
    },
    hard: {
      random: [
        "Quantum computing is a type of computation that harnesses the collective properties of quantum states to perform calculations. The field of quantum computing focuses on developing computer technology based on quantum theory principles.",
        "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
        "Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain."
      ],
      quotes: [
        "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
        "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
        "The way to get started is to quit talking and begin doing. - Walt Disney"
      ],
      code: [
        "const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };",
        "function* fibonacci() { let [prev, curr] = [0, 1]; while (true) { yield curr; [prev, curr] = [curr, prev + curr]; } }",
        "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn.apply(this, args); cache.set(key, result); return result; }; };"
      ]
    }
  }

  const getRandomText = () => {
    const availableTexts = texts[difficulty][textType]
    return availableTexts[Math.floor(Math.random() * availableTexts.length)]
  }

  const startTest = () => {
    const newText = getRandomText()
    setText(newText)
    setUserInput('')
    setGameState('playing')
    setTimeStarted(Date.now())
    setGameTime(0)
    setWpm(0)
    setAccuracy(0)
    setErrors(0)
    setCurrentCharIndex(0)
    setIsCorrect(true)
    
    // Focus the input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const calculateStats = () => {
    const timeElapsed = Math.floor((Date.now() - timeStarted) / 1000)
    const minutes = timeElapsed / 60
    
    // Calculate WPM (words per minute)
    const words = text.trim().split(/\s+/).length
    const calculatedWpm = Math.round(words / minutes)
    
    // Calculate accuracy
    let correctChars = 0
    let totalErrors = 0
    
    for (let i = 0; i < Math.min(userInput.length, text.length); i++) {
      if (userInput[i] === text[i]) {
        correctChars++
      } else {
        totalErrors++
      }
    }
    
    const calculatedAccuracy = Math.round((correctChars / text.length) * 100)
    
    setWpm(calculatedWpm)
    setAccuracy(calculatedAccuracy)
    setErrors(totalErrors)
    setGameTime(timeElapsed)
    
    // Update best scores
    if (calculatedWpm > bestWpm) {
      setBestWpm(calculatedWpm)
      localStorage.setItem('typingBestWpm', calculatedWpm.toString())
    }
    
    if (calculatedAccuracy > bestAccuracy) {
      setBestAccuracy(calculatedAccuracy)
      localStorage.setItem('typingBestAccuracy', calculatedAccuracy.toString())
    }
    
    // Add to history
    setGameHistory(prev => [{
      difficulty: difficulty,
      textType: textType,
      wpm: calculatedWpm,
      accuracy: calculatedAccuracy,
      time: timeElapsed,
      errors: totalErrors,
      timestamp: new Date().toLocaleDateString()
    }, ...prev.slice(0, 9)]) // Keep last 10 games
    
    setGameState('finished')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setUserInput(value)
    
    if (gameState === 'playing') {
      // Check if user has finished typing
      if (value.length >= text.length) {
        calculateStats()
        return
      }
      
      // Check current character
      const currentChar = value[value.length - 1]
      const expectedChar = text[value.length - 1]
      
      if (currentChar === expectedChar) {
        setIsCorrect(true)
        setCurrentCharIndex(value.length)
      } else {
        setIsCorrect(false)
      }
    }
  }

  const resetTest = () => {
    setGameState('waiting')
    setText('')
    setUserInput('')
    setTimeStarted(null)
    setGameTime(0)
    setWpm(0)
    setAccuracy(0)
    setErrors(0)
    setCurrentCharIndex(0)
    setIsCorrect(true)
  }

  const resetScores = () => {
    setBestWpm(0)
    setBestAccuracy(0)
    localStorage.removeItem('typingBestWpm')
    localStorage.removeItem('typingBestAccuracy')
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

  const renderText = () => {
    return text.split('').map((char, index) => {
      let charStyle = { color: '#666' }
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          charStyle = { color: '#00d4aa' } // Correct
        } else {
          charStyle = { color: '#ff6b6b', textDecoration: 'underline' } // Incorrect
        }
      } else if (index === userInput.length) {
        charStyle = { 
          color: '#ffd93d', 
          backgroundColor: 'rgba(255, 217, 61, 0.2)',
          borderRadius: '2px',
          padding: '1px'
        } // Current position
      }
      
      return (
        <span key={index} style={charStyle}>
          {char}
        </span>
      )
    })
  }

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '900px',
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
        ⌨️ Typing Speed Test
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
          <div style={{ fontWeight: 'bold' }}>Best WPM</div>
          <div>{bestWpm}</div>
        </div>
        <div style={{ color: '#ffd93d', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Best Accuracy</div>
          <div>{bestAccuracy}%</div>
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '1.1rem' }}>
          <div style={{ fontWeight: 'bold' }}>Current WPM</div>
          <div>{wpm}</div>
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
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            
            <label style={{ color: '#ccc', fontSize: '1.1rem' }}>Text Type:</label>
            <select
              value={textType}
              onChange={(e) => setTextType(e.target.value)}
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
              <option value="random">Random</option>
              <option value="quotes">Quotes</option>
              <option value="code">Code</option>
            </select>
          </div>
          
          <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Test your typing speed and accuracy! Choose your difficulty and text type to get started.
          </p>
          
          <button
            onClick={startTest}
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
            🚀 Start Test!
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
            {gameState === 'finished' ? '🎉 Test Complete!' : 'Type the text below as fast and accurately as you can!'}
          </div>

          {/* Text Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'left',
            fontSize: '1.2rem',
            lineHeight: '1.8',
            minHeight: '150px',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            {renderText()}
          </div>

          {/* Input Field */}
          {gameState === 'playing' && (
            <div style={{ marginBottom: '2rem' }}>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  border: `2px solid ${isCorrect ? '#00d4aa' : '#ff6b6b'}`,
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'monospace'
                }}
                disabled={gameState !== 'playing'}
              />
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
                <div style={{ color: '#00d4aa', fontSize: '2rem', fontWeight: 'bold' }}>{wpm}</div>
                <div style={{ color: '#ccc' }}>Words Per Minute</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 217, 61, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #ffd93d'
              }}>
                <div style={{ color: '#ffd93d', fontSize: '2rem', fontWeight: 'bold' }}>{accuracy}%</div>
                <div style={{ color: '#ccc' }}>Accuracy</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #ff6b6b'
              }}>
                <div style={{ color: '#ff6b6b', fontSize: '2rem', fontWeight: 'bold' }}>{errors}</div>
                <div style={{ color: '#ccc' }}>Errors</div>
              </div>
              
              <div style={{
                background: 'rgba(156, 136, 255, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #9c88ff'
              }}>
                <div style={{ color: '#9c88ff', fontSize: '2rem', fontWeight: 'bold' }}>{gameTime}s</div>
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
                onClick={startTest}
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
                onClick={resetTest}
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
            onClick={resetTest}
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
            🔄 Reset Test
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
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Recent Tests</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {gameHistory.map((test, index) => (
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
                <span style={{ color: '#9c88ff' }}>🎯 {test.difficulty}</span>
                <span style={{ color: '#00d4aa' }}>⚡ {test.wpm} WPM</span>
                <span style={{ color: '#ffd93d' }}>📊 {test.accuracy}%</span>
                <span style={{ color: '#ff6b6b' }}>⏱️ {test.time}s</span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{test.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TypingSpeedTest
