'use client'

import { useState } from "react"
import { askQuestion } from '@/utils/api'

const Questions = () => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState()
  const handleChange = (e) => {
    setValue(e.target.value)
    // do stuff
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setIsLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input disabled={isLoading} onChange={handleChange} value={value} placeholder="Ask a question here" className="border border-black/20 text-lg rounded-lg px-4 py-2" />
        <button disabled={isLoading} className="px-4 py-2 rounded-lg text-lg bg-blue-400">Ask</button>
      </form>
      {isLoading && <div>....loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Questions