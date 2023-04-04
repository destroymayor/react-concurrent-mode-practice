import { useState } from 'react'

function Range({ title, maxQuantity = 3000, onChange }) {
  const [rangeValue, setRangeValue] = useState(0)

  const handleChange = (e) => {
    setRangeValue(e.target.value)

    onChange(e.target.value)
  }

  return (
    <div className="range">
      <span>{title}</span>
      <div className="range-content">
        <input type="range" min="0" max={maxQuantity} value={rangeValue} onChange={handleChange} />
        <span>{rangeValue}</span>
      </div>
    </div>
  )
}

export default Range
