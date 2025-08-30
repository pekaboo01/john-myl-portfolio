import React, { useState, useEffect } from 'react'
import './PalindromeGame.css'

const PalindromeGame = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [examples] = useState([
    'racecar',
    'madam',
    'level',
    'deed',
    'radar',
    'civic',
    'rotor',
    'kayak',
    'A man a plan a canal Panama',
    'Do geese see God?',
    'Was it a car or a cat I saw?',
    'Never odd or even',
    'A Toyota! Race fast, safe car! A Toyota!',
    'Taco cat',
    'Evil olive'
  ])
  const [currentExample, setCurrentExample] = useState(0)
  const [score, setScore] = useState(0)
  const [totalChecks, setTotalChecks] = useState(0)

  // Rotate through examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [examples.length])

  // Check if text is palindrome
  const isPalindrome = (text) => {
    if (!text.trim()) return false
    
    // Remove all non-alphanumeric characters and convert to lowercase
    const cleanText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    
    // Check if it reads the same forwards and backwards
    return cleanText === cleanText.split('').reverse().join('')
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value)
    setResult(null) // Clear previous result
  }

  // Check palindrome
  const checkPalindrome = () => {
    if (!input.trim()) return
    
    const isPal = isPalindrome(input)
    setResult(isPal)
    setTotalChecks(prev => prev + 1)
    
    if (isPal) {
      setScore(prev => prev + 1)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkPalindrome()
    }
  }

  // Try example
  const tryExample = (example) => {
    setInput(example)
    setResult(null)
  }

  // Clear input
  const clearInput = () => {
    setInput('')
    setResult(null)
  }

  // Get result message and styling
  const getResultDisplay = () => {
    if (result === null) return null
    
    if (result) {
      return {
        message: '🎉 Yes! That\'s a palindrome!',
        className: 'result-success',
        icon: '✅'
      }
    } else {
      return {
        message: '❌ Nope, not a palindrome',
        className: 'result-error',
        icon: '❌'
      }
    }
  }

  const resultDisplay = getResultDisplay()

  return (
    <div className="palindrome-game">
      <div className="game-header">
        <h3>🔄 Palindrome Checker</h3>
        <div className="game-stats">
          <span className="score">Score: {score}</span>
          <span className="total">Total: {totalChecks}</span>
        </div>
      </div>

      <div className="game-content">
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter a word or phrase..."
              className="palindrome-input"
            />
            <div className="input-buttons">
              <button 
                className="check-btn btn btn-ripple"
                onClick={checkPalindrome}
                disabled={!input.trim()}
              >
                🔍 Check
              </button>
              <button 
                className="clear-btn btn btn-ripple"
                onClick={clearInput}
                disabled={!input.trim()}
              >
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {resultDisplay && (
          <div className={`result-display ${resultDisplay.className} fade-in`}>
            <span className="result-icon">{resultDisplay.icon}</span>
            <p className="result-message">{resultDisplay.message}</p>
          </div>
        )}

        {/* Examples Section */}
        <div className="examples-section">
          <h4>💡 Try These Examples:</h4>
          <div className="examples-grid">
            {examples.map((example, index) => (
              <button
                key={index}
                className={`example-btn ${index === currentExample ? 'highlighted' : ''}`}
                onClick={() => tryExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="how-it-works">
          <h4>🔬 How It Works:</h4>
          <div className="explanation">
            <p>
              A <strong>palindrome</strong> is a word, phrase, number, or other sequence of characters 
              that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).
            </p>
            <div className="examples">
              <div className="example">
                <strong>Simple:</strong> "racecar" → "racecar" ✅
              </div>
              <div className="example">
                <strong>Phrase:</strong> "A man a plan a canal Panama" → "A man a plan a canal Panama" ✅
              </div>
              <div className="example">
                <strong>Not a palindrome:</strong> "hello" → "olleh" ❌
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PalindromeGame
