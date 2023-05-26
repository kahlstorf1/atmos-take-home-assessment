import React, { useEffect, useState } from 'react'

import questions from './questions.json'
import Button from './components/Button'
import Question from './components/Question'
import ProgressBar from './components/ProgressBar'
import debounceHook from '../hooks/debounceHook'
import { toTitleCase } from './utils'
import { Question as QuestionType } from './types'

function App() {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState({})
  const [status, setStatus] = useState({ state: '', lastSaved: new Date() })
  const [modal, setModal] = useState<string|null>(null)

  const hideModal = () => {
    document.body.style.overflow = 'auto'
    setModal(null)
  }

  const showModal = (newModal: string) => {
    document.body.style.overflow = 'hidden'
    setModal(newModal)
  }

  const save = debounceHook(() => {
    if (Object.keys(data).length > 0) {
      setStatus({ ...status, state: 'working' })
      setTimeout(() => {
        setStatus({ state: 'saved', lastSaved: new Date() })
      }, 1000)
    }
  }, 500)

  useEffect(() => {
    save()
  }, [data])

  const renderStatus = () => {
    switch (status.state) {
      case 'saved':
        return `Saved at ${status.lastSaved.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      case 'working':
        return 'Saving...'
      case 'error':
        return 'Error'
      default:
        return null
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const question: QuestionType = questions[index]

  return (
    <>
      <div className="m-10 mx-auto max-w-5xl space-y-5">
        <div className="relative flex h-[500px] flex-col overflow-hidden rounded-lg bg-gray-100 p-7 pt-20">
          <ProgressBar current={index + 1} max={questions.length} />
          <Question
            question={question}
            onChange={handleChange}
          />
          <div className="flex-1" />
          <div className="flex items-center space-x-5">
            <Button
              onClick={() => { setIndex(index - 1) }}
              disabled={index < 1}
            >
              &larr; Back
            </Button>
            { questions[index].modals && <Button variant="outline" onClick={() => showModal('description')}>Modal</Button> }

            <span className="flex-1 text-right">{ renderStatus() }</span>
            <Button>Save and Exit</Button>
            <Button
              onClick={() => { setIndex(index + 1) }}
              disabled={index >= questions.length - 1}
            >
              Next &rarr;
            </Button>
          </div>
        </div>
      </div>

      { modal && question.modals && modal in question.modals && (
        <div className="fixed inset-0 z-10 grid place-content-center">
          <div className="z-20 mx-auto max-w-xl space-y-5 rounded-lg border border-gray-300 bg-white p-6">
            <h1 className="text-xl font-bold text-gray-800">{ toTitleCase(modal) }</h1>
            <p>{ question.modals[modal] }</p>
            <Button onClick={hideModal}>Done</Button>
          </div>
          <div className="absolute inset-0 bg-black opacity-60" onClick={hideModal} role="none" />
        </div>
      ) }

      <div>
        <pre>question = { JSON.stringify(question, null, 2) }</pre>
        <pre>data = { JSON.stringify(data, null, 2) }</pre>
      </div>
    </>
  )
}

export default App
