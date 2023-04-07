import { useState, useTransition, useMemo, useDeferredValue, Suspense } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FPS from './FPS'
import List from './List'
import Range from './Range'

import './App.css'

function App() {
  const [maxQuantity, setMaxQuantity] = useState(3000)
  const [synchronousListCount, setSynchronousListCount] = useState('')
  const [concurrentModeListCount, setConcurrentModeListCount] = useState('')
  const [isPending, startTransition] = useTransition()

  const synchronousListData = useMemo(() => Array.from({ length: synchronousListCount }, () => uuidv4()), [synchronousListCount])
  const deferredListData = useDeferredValue(Array.from({ length: concurrentModeListCount }, () => uuidv4()))

  return (
    <div>
      <div className="range-wrapper">
        <FPS />
        <Range
          maxQuantity={maxQuantity}
          title="Synchronous"
          onChange={(value) => {
            setSynchronousListCount(value)
          }}
        />
        <Range
          maxQuantity={maxQuantity}
          title="Concurrent Mode"
          onChange={(value) => {
            startTransition(() => {
              setConcurrentModeListCount(value)
            })
          }}
        />
        <div className="quantity">
          <span>Max quantity</span>
          <input value={maxQuantity} type="number" onChange={(e) => setMaxQuantity(e.target.value)} />
        </div>
      </div>

      <List data={synchronousListData} />
      <Suspense fallback={<div>loading...</div>}>
        <List isPending={isPending} data={deferredListData} />
      </Suspense>
    </div>
  )
}

export default App
