import { useState, useTransition, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FPS from './FPS'
import List from './List'
import Range from './Range'

import './App.css'

function App() {
  const [maxQuantity, setMaxQuantity] = useState(3000)
  const [listCount, setListCount] = useState('')
  const [isPending, startTransition] = useTransition()

  const listData = useMemo(() => Array.from({ length: listCount }, () => uuidv4()), [listCount])

  return (
    <div>
      <div className="range-wrapper">
        <FPS />
        <Range
          maxQuantity={maxQuantity}
          title="Synchronous"
          onChange={(value) => {
            setListCount(value)
          }}
        />
        <Range
          maxQuantity={maxQuantity}
          title="Concurrent Mode"
          onChange={(value) => {
            startTransition(() => {
              setListCount(value)
            })
          }}
        />
        <div className="quantity">
          <span>Max quantity</span>
          <input value={maxQuantity} type="number" onChange={(e) => setMaxQuantity(e.target.value)} />
        </div>
      </div>

      <List isPending={isPending} data={listData} />
    </div>
  )
}

export default App
