// frontend/src/pages/Posts.jsx
export default function Posts() {}
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Opportunities
                </h1>
            </div>

            {/* Placeholder — Backend Person 5 will connect real data */}
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <p className="text-4xl mb-3">🔍</p>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Opportunities coming soon
                </h2>
                <p className="text-sm text-gray-500">
                    Our team is building this page. Check back soon!
                </p>
            </div>
        </div>
    )
import useFetch from "../hooks/useFetch"
import { getPosts } from "../services/postsAPI"

export default function Posts() {
  const { data, loading, error } = useFetch(getPosts)

  if (loading) return <p className="text-center py-8">Loading opportunities...</p>
  if (error) return <p className="text-center py-8 text-red-600">Error: {error.message}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      
      {data?.posts?.map((post) => (
        <div key={post.id} className="border rounded p-4 mb-3 bg-white shadow-sm">
          <h3 className="font-semibold">{post.title}</h3>
          {post.content && <p className="text-gray-600 text-sm mt-1">{post.content.substring(0, 100)}...</p>}
        </div>
      ))}
      
      {data?.posts?.length === 0 && (
        <p className="text-gray-500 text-center py-4">No opportunities found</p>
      )}
    </div>
  )
}