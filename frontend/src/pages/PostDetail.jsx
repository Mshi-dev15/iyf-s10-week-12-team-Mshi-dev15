import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import LoadingSpinner from '../components/shared/LoadingSpinner'

export default function PostDetail() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO: Fetch post from API when postsAPI is available
    const fetchPost = async () => {
      try {
        setLoading(true)
        // const data = await postsAPI.getById(postId)
        // setPost(data)
        
        // Placeholder data for now
        setPost({
          _id: postId,
          title: 'Sample Post',
          content: 'This is a placeholder. PostDetail page needs postsAPI from FE Person 2.',
          category: 'internship',
          author: { username: 'Author Name' },
          createdAt: new Date().toISOString(),
          location: 'Nairobi, Kenya',
          tags: ['sample', 'placeholder']
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [postId])

  if (loading) return <LoadingSpinner text="Loading post..." />
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>
  if (!post) return <div className="text-center py-12">Post not found</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/posts" className="text-blue-600 hover:underline">
        ← Back to Opportunities
      </Link>

      <Card className="p-6 md:p-8">
        <div className="mb-4">
          <span className={`
            inline-block px-3 py-1 text-sm font-medium rounded-full
            ${post.category === 'internship' ? 'bg-blue-100 text-blue-800' : ''}
            ${post.category === 'gig' ? 'bg-green-100 text-green-800' : ''}
            ${post.category === 'volunteer' ? 'bg-purple-100 text-purple-800' : ''}
            ${post.category === 'event' ? 'bg-orange-100 text-orange-800' : ''}
          `}>
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>By {post.author?.username || 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-KE')}</span>
          {post.location && (
            <>
              <span>•</span>
              <span>📍 {post.location}</span>
            </>
          )}
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <p className="text-gray-600">
          Comments section will be implemented when commentsAPI is available from FE Person 2.
        </p>
      </Card>
    </div>
  )
}
