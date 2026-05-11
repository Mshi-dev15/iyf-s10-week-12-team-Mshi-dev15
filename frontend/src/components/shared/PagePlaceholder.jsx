export default function PagePlaceholder({ type = 'list', rows = 3 }) {
  const items = Array.from({ length: rows }, (_, index) => index)

  if (type === 'hero') {
    return (
      <div className="animate-pulse space-y-8">
        <div className="rounded-2xl bg-gray-200 h-64" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.concat(items).slice(0, 4).map((item) => (
            <div key={item} className="h-32 rounded-xl bg-gray-100 border border-gray-200" />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'detail') {
    return (
      <div className="animate-pulse max-w-4xl mx-auto space-y-6">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="rounded-lg bg-white border border-gray-200 p-6 md:p-8 space-y-5">
          <div className="h-6 bg-gray-200 rounded w-28" />
          <div className="h-9 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse space-y-3">
      {items.map((item) => (
        <div key={item} className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
      ))}
    </div>
  )
}
