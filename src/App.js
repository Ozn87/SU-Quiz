import React, { useState } from 'react'
import core1 from './data/core1.json'

export default function App() {
  let questions = []

  for (let i in core1) {
    questions.push(core1[i])
  }

  console.log(questions)

  const [currentQuestion, setCurrentQuestion] = useState(99)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion][1]}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion][2][0].map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
