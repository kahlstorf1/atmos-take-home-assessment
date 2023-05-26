import { useEffect, useRef } from 'react'

function debounce(save, delay) {
  const timeoutRef = useRef(null)

  const debouncedFunc = (...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => save(...args), delay)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [save, delay])

  return debouncedFunc
}

export default debounce
