export default function List({ isPending, data = [] }) {
  if (data.length === 0) return null

  return (
    <div className="list" style={{ opacity: isPending ? 0.5 : '' }}>
      {data.map((item) => (
        <div className="list-item" key={item}>
          *
        </div>
      ))}
    </div>
  )
}
