// frontend/src/pages/Posts.jsx
import useFetch from "../hooks/useFetch"
import { getPosts } from "../services/postsAPI"

export default function Posts() {
  const { data, loading, error } = useFetch(getPosts)

  if (loading) {
    return <p className="text-center py-8">Loading opportunities...</p>
  }
  
  if (error) {
    return <p className="text-center py-8 text-red-600">Error: {error.message}</p>
  }

  const posts = data?.data || data?.posts || []

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      
      {posts.map((post) => (
        <div 
          key={post._id || post.id} 
          className="border rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <h3 className="font-semibold text-lg">{post.title}</h3>
          {post.content && (
            <p className="text-gray-600 text-sm mt-1">
              {post.content.substring(0, 100)}...
            </p>
          )}
          {post.author?.username && (
            <p className="text-xs text-gray-500 mt-2">
              Posted by {post.author.username}
            </p>
          )}
        </div>
      ))}
      
      {posts.length === 0 && (
        <p className="text-gray-500 text-center py-4">No opportunities found</p>
      )}
    </div>
  )
}