import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/shared/Card'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import Button from '../components/shared/Button'
import api from '../services/api'

export default function PostDetail() {
  const { postId } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentError, setCommentError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/posts/${postId}`)
        setPost(res.data.data)
        
        // Fetch comments
        const commentsRes = await api.get(`/posts/${postId}/comments`)
        setComments(commentsRes.data.data || [])
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [postId])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    setCommentLoading(true)
    setCommentError(null)
    
    try {
      const res = await api.post(`/posts/${postId}/comments`, { content: newComment })
      setComments([...comments, res.data.data])
      setNewComment('')
    } catch (err) {
      setCommentError(err.response?.data?.error?.message || 'Failed to post comment')
    } finally {
      setCommentLoading(false)
    }
  }

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
        <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
        
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
              required
            />
            {commentError && (
              <p className="text-red-600 text-sm mt-1">{commentError}</p>
            )}
            <Button type="submit" variant="primary" className="mt-2" disabled={commentLoading}>
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-b pb-3">
                <p className="font-semibold text-sm">{comment.author?.username || 'Anonymous'}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
