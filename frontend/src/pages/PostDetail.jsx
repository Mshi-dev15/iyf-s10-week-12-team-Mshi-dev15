import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import PagePlaceholder from '../components/shared/PagePlaceholder'
import { useAuth } from '../context/AuthContext'
import { createComment, getComments, getPost, votePost } from '../services/postsAPI'

const getAuthorName = (author) => {
  if (!author) return 'Unknown'
  if (author.username) return author.username
  const name = `${author.profile?.firstName || ''} ${author.profile?.lastName || ''}`.trim()
  return name || author.email || 'Unknown'
}

export default function PostDetail() {
  const { postId } = useParams()
  const { isAuthenticated } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [commenting, setCommenting] = useState(false)
  const [liking, setLiking] = useState(false)
  const [error, setError] = useState(null)
  const [commentError, setCommentError] = useState(null)
  const [likeError, setLikeError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const [postData, commentData] = await Promise.all([
          getPost(postId),
          getComments(postId)
        ])
        setPost(postData)
        setComments(commentData)
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setCommentError(null)

    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty')
      return
    }

    setCommenting(true)

    try {
      const newComment = await createComment(postId, { content: commentText })
      setComments((current) => [newComment, ...current])
      setCommentText('')
    } catch (err) {
      setCommentError(err.response?.data?.error?.message || err.message || 'Failed to add comment')
    } finally {
      setCommenting(false)
    }
  }

  const handleVote = async (voteType) => {
    setLikeError(null)

    if (!isAuthenticated) {
      setLikeError('Please sign in to vote on this opportunity')
      return
    }

    setLiking(true)

    try {
      const updatedPost = await votePost(postId, voteType)
      setPost(updatedPost)
    } catch (err) {
      setLikeError(err.response?.data?.error?.message || err.message || 'Failed to vote on post')
    } finally {
      setLiking(false)
    }
  }

  if (loading) return <PagePlaceholder type="detail" />
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>
  if (!post) return <div className="text-center py-12">Post not found</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/posts" className="text-blue-600 hover:underline">
        Back to Opportunities
      </Link>

      <Card className="p-6 md:p-8">
        <div className="mb-4">
          <span className={`
            inline-block px-3 py-1 text-sm font-medium rounded-full
            ${post.category === 'internship' ? 'bg-blue-100 text-blue-800' : ''}
            ${post.category === 'gig' ? 'bg-green-100 text-green-800' : ''}
            ${post.category === 'volunteer' ? 'bg-purple-100 text-purple-800' : ''}
            ${post.category === 'event' ? 'bg-orange-100 text-orange-800' : ''}
            ${post.category === 'other' ? 'bg-gray-100 text-gray-800' : ''}
          `}>
            {post.category}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              loading={liking}
              disabled={liking}
              onClick={() => handleVote('upvote')}
              className="px-3 py-2"
            >
              👍 Upvote
            </Button>
            <span className="text-lg font-medium min-w-[2rem] text-center">
              {post.votes?.netScore || post.likes || 0}
            </span>
            <Button
              type="button"
              variant="outline"
              loading={liking}
              disabled={liking}
              onClick={() => handleVote('downvote')}
              className="px-3 py-2"
            >
              👎 Downvote
            </Button>
          </div>
        </div>

        {likeError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {likeError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
          <span>
            By{' '}
            <Link
              to={`/users/${post.author?._id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {getAuthorName(post.author)}
            </Link>
          </span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-KE')}</span>
          {post.location && <span>{post.location}</span>}
          {post.author?.profile?.phone && (
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => window.open(`tel:${post.author.profile.phone}`)}
              className="text-xs"
            >
              📞 Call
            </Button>
          )}
          {post.author?.email && (
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => window.open(`mailto:${post.author.email}`)}
              className="text-xs"
            >
              ✉️ Email
            </Button>
          )}
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
            {commentError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {commentError}
              </div>
            )}
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add a comment..."
            />
            <Button type="submit" variant="primary" loading={commenting} disabled={commenting}>
              Post Comment
            </Button>
          </form>
        ) : (
          <p className="mb-6 text-gray-600">
            <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link> to comment.
          </p>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="text-sm text-gray-500 mb-1">
                {getAuthorName(comment.author)} - {new Date(comment.createdAt).toLocaleDateString('en-KE')}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </Card>
    </div>
  )
}
