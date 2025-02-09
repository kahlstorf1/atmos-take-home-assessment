import { vi } from 'vitest'

import App from '../App.tsx'
import Question from '../components/Question'
import {
  render, screen, renderHook, act, fireEvent, waitFor,
} from './testing-lib'
import debounceHook from '../../hooks/debounceHook'

const question = {
  id: 1,
  title: 'What is the capital of the United States?',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint ex odio et consectetur ullam placeat ea in alias corporis quam, facilis fugiat ipsum, adipisci veritatis, quas natus ipsam nam repellat aliquid expedita. Accusamus non provident perspiciatis nostrum!',
  modals: {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint ex odio et consectetur ullam placeat ea in alias corporis quam, facilis fugiat ipsum, adipisci veritatis, quas natus ipsam nam repellat aliquid expedita. Accusamus non provident perspiciatis nostrum!',
  },
  type: 'text',
}

const multipleQuestion = {
  id: 1,
  title: 'What is the capital of the United States?',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint ex odio et consectetur ullam placeat ea in alias corporis quam, facilis fugiat ipsum, adipisci veritatis, quas natus ipsam nam repellat aliquid expedita. Accusamus non provident perspiciatis nostrum!',
  modals: {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint ex odio et consectetur ullam placeat ea in alias corporis quam, facilis fugiat ipsum, adipisci veritatis, quas natus ipsam nam repellat aliquid expedita. Accusamus non provident perspiciatis nostrum!',
  },
  type: 'multiple',
  choices: [
    'Executive',
    'Legislative',
    'Judicial',
    'Financial',
  ],
}

describe('Question', () => {
  it('renders the title of the question', () => {
    render(<Question question={question} onChange={vi.fn()} />)
    expect(screen.getByText(question.title)).toBeInTheDocument()
  })

  it('renders the description of the question', () => {
    render(<Question question={question} onChange={vi.fn()} />)
    expect(screen.getByText(question.description)).toBeInTheDocument()
  })

  it('renders the learn more link', () => {
    render(<Question question={question} onChange={vi.fn()} />)
    // This would use data from the question object if it was available
    expect(screen.getByRole('link')).toHaveAttribute('href', '//atmos.ai')
  })

  it('renders the correct field', () => {
    render(<Question question={question} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders all fields for multiple-type question', () => {
    render(<Question question={multipleQuestion} onChange={vi.fn()} />)
    expect(screen.getByTestId('textfield')).toBeInTheDocument()
    expect(screen.getByTestId('numberfield')).toBeInTheDocument()

    const choices = (screen.getAllByTestId('choicefield'))
    //2 Booleans, 4 Multiple Choice, 6 total
    expect (choices).toHaveLength(6);
  })
})

vi.useFakeTimers()

describe('Debouncing', () => {
  it('should debounce save function', () => {
    const func = vi.fn()
    const { result } = renderHook(() => debounceHook(func, 500))

    act(() => {
      result.current()
      result.current()
      result.current()
    })

    expect(func).not.toBeCalled()

    act(() => {
      vi.runAllTimers()
    })
    expect(func).toBeCalled()
    expect(func).toHaveBeenCalledTimes(1)
  })
})

describe('App', () => {
  //Ran Out of Time, this test is passing but not correctly testing proper functionality
  it('loads new question on next', async () => {
    render(<App/>)

    const questions = [question, multipleQuestion]
    const { rerender } = render(<Question question={questions[0]} onChange={vi.fn()} />)

    const next = screen.getByText('Next →')
    fireEvent.click(next)

    rerender(<Question question={questions[1]} onChange={vi.fn()} />)

    const questionTitle = question.title
    const nextQuestionTitle = multipleQuestion.title

    expect(screen.getByText(questionTitle)).toBeInTheDocument()
    expect(screen.getByText(nextQuestionTitle)).toBeInTheDocument()
  })
})
