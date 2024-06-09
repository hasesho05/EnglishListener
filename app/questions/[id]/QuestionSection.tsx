'use client'

import ListeningComponent from '@/app/components/ListeningComponent'
import { Choice, Question } from '@/app/types'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const QuestionSection = (props: { question: Question; choices: Choice[] }) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showCommentary, setShowCommentary] = useState(false)

  if (!props.question) {
    return <div>Question not found</div>
  }

  const handleChoiceClick = (choiceId: number) => {
    setSelectedChoice(choiceId)
    const selectedChoiceObj = props.choices.find((c) => c.id === choiceId)
    if (selectedChoiceObj && selectedChoiceObj.is_correct) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
    setShowOverlay(true)

    setTimeout(() => {
      setShowCommentary(true)
    }, 1000)
  }

  const getButtonColor = (choiceId: number) => {
    if (selectedChoice === null) {
      return ''
    } else if (selectedChoice === choiceId) {
      const selectedChoiceObj = props.choices.find((c) => c.id === choiceId)
      if (selectedChoiceObj && selectedChoiceObj.is_correct) {
        return 'bg-green-200 hover:bg-green-200 '
      } else {
        return 'bg-red-200 hover:bg-red-200'
      }
    } else {
      const choiceObj = props.choices.find((c) => c.id === choiceId)
      if (choiceObj && choiceObj.is_correct) {
        return 'bg-green-200 hover:bg-green-200'
      }
    }
    return ''
  }

  return (
    <div className="">
      {!showCommentary ? (
        <div className="max-w-[1000px]w-full flex flex-col items-center justify-center min-h-screen overflow-hidden">
          {showOverlay && (
            <div className="fixed top-0 left-0 right-0 bottom-20 flex items-center justify-center z-50">
              <div
                className={`text-9xl font-semibold ${
                  isCorrect ? 'text-green-200' : 'text-red-200'
                }`}
              >
                {isCorrect ? '○' : '×'}
              </div>
            </div>
          )}
          <div className="text-center mt-auto">
            <h1 className="text-2xl font-bold">
              Listen to the question and choose correct answer
            </h1>
          </div>

          <div className="mt-auto pt-4 bg-white">
            <div className="max-w-[1000px] mx-auto">
              <div className="px-2 grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-4">
                {props.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    variant="outline"
                    className={`w-full ${getButtonColor(choice.id)}`}
                    onClick={() => handleChoiceClick(choice.id)}
                  >
                    <span>{choice.text}</span>
                  </Button>
                ))}
              </div>
            </div>
            <ListeningComponent audioFilePath={props.question.audio_file_src} />
          </div>
        </div>
      ) : (
        <div className="w-full pt-20 min-h-screen h-full flex flex-col">
          <div className="h-full bg-white p-4 rounded">
            <p>{props.question.text}</p>

            <p className="mt-4 text-xs">(日本語訳)</p>
            <p className="text-xs mt-1">{props.question.translation}</p>
            <br />
            <small>選択肢</small>
            <div className="gap-2">
              {props.choices.map((choice, index) => (
                <p
                  key={choice.id}
                  className={`w-full rounded-md ${
                    choice.is_correct ? 'text-green-400' : ''
                  }`}
                >
                  <span className="px-2">
                    ({index + 1}). {choice.text}
                  </span>
                </p>
              ))}
            </div>
            <br />

            <small>解説</small>
            <p className="text-xs">{props.question.commentary}</p>
          </div>
          <div className="mt-auto">
            <ListeningComponent
              audioFilePath={props.question.audio_file_src}
              autoPlay={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionSection
