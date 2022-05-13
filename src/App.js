import React, { useState, useEffect } from 'react'
import core1 from './data/core1.json'

export default function App() {
  //console.log(questions);

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [answerStr, setAnswerStr] = useState('')
  const [optionsSubmit, setOptionSubmit] = useState(false)
  const [showExam, setExam] = useState(false)
  const [examAnswers, setExamAnswers] = useState(true)
  const [questions, setQuestions] = useState([])

  let fullDataSet = []

  const getRandom = (arr, n) => {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len)

    while (n--) {
      let x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }

  const examMode = (mode) => {
    setExam(true)
    if (mode === 'practice') {
      for (let i in core1) {
        fullDataSet.push(core1[i])
      }
      setQuestions(fullDataSet)
    } else {
      for (let i in core1) {
        fullDataSet.push(core1[i])
      }
      setExamAnswers(false)
      setQuestions(getRandom(fullDataSet, 75))
    }
  }

  const handleAnswerOptionClick = (event) => {
    setOptionSubmit(true)
    event.preventDefault()
  }

  const nextQuestion = () => {
    setAnswerStr('')
    let followquestion = currentQuestion + 1
    if (followquestion < questions.length) {
      setCurrentQuestion(followquestion)
    } else {
      setShowScore(true)
    }

    let answercheckarr = []
    let answercheck = ''
    for (let i in answerStr) {
      answercheckarr.push(answerStr.charAt(i))
    }
    answercheckarr.sort()
    for (let i in answercheckarr) {
      answercheck = answercheck + answercheckarr[i]
    }
    console.log(answercheck)
    let prunedAnswer = questions[currentQuestion][3].split(/\r?\n/)[0]

    if (`Answer:${answercheck}` === prunedAnswer.replace(/ /g, '')) {
      alert('correct answer')
      setScore(score + 1)
    }

    document.getElementById('main-form').reset()
    setOptionSubmit(false)
  }

  useEffect(() => {
    console.log('In effect: ' + answerStr)
  })
  return (
    <div className="app">
      {showExam ? (
        <>
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
                <div className="question-text">
                  {questions[currentQuestion][1]}
                </div>
              </div>
              <div className="answer-section">
                <form id="main-form" onSubmit={handleAnswerOptionClick}>
                  {questions[currentQuestion][2][0].map((answerOption) => (
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          onClick={() => {
                            if (answerStr === answerOption.charAt(0)) {
                            }
                            setAnswerStr(answerStr + answerOption.charAt(0))
                          }}
                        />
                        {answerOption}
                      </label>
                    </div>
                  ))}

                  {examAnswers ? (
                    <button className="btn btn-default" type="submit">
                      Submit
                    </button>
                  ) : (
                    ''
                  )}
                </form>
                {optionsSubmit && examAnswers ? (
                  <h3>Correct {questions[currentQuestion][3]}</h3>
                ) : (
                  ''
                )}

                <button onClick={nextQuestion}>Next Question</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <button
            className="button-19"
            onClick={() => {
              examMode('exam')
            }}
          >
            Exam Mode
          </button>
          <button
            className="button-19"
            onClick={() => {
              examMode('practice')
            }}
          >
            Full Question Bank
          </button>
        </>
      )}
    </div>
  )
}
