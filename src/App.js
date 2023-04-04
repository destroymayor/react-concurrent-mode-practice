import { useState, useTransition, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FPS from './FPS'
import List from './List'
import Range from './Range'

import './App.css'

function App() {
  const [count, setCount] = useState('')
  const [isPending, startTransition] = useTransition()

  const listData = useMemo(() => Array.from({ length: count }, () => uuidv4()), [count])

  return (
    <div>
      <div className="range-wrapper">
        <FPS />
        <Range
          title="Synchronous"
          onChange={(value) => {
            setCount(value)
          }}
        />
        <Range
          title="Concurrent Mode"
          onChange={(value) => {
            startTransition(() => {
              setCount(value)
            })
          }}
        />
      </div>

      <List isPending={isPending} data={listData} />
    </div>
  )
}

export default App
