import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/shared/Card'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { getPostById } from '../services/postsAPI'
import { votePost } from '../services/votesAPI'
import { getComments, createComment } from '../services/commentsAPI'
import { toggleBookmark, sharePost } from '../services/engagementAPI'

export default function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [voting, setVoting] = useState(false)
  const [bookmarking, setBookmarking] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [msg, setMsg] = useState('') 
  
  // Comment form state
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch post details
        const postResponse = await getPostById(postId)
        if (postResponse.data.success) {
          setPost(postResponse.data.data)
        }
        
        // Fetch comments
        const commentsResponse = await getComments(postId)
        if (commentsResponse.data.success) {
          setComments(commentsResponse.data.data || [])
        }
      } catch (err) {
        setError(err.response?.data?.error?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [postId])

    const handleVote = async (voteType) => {
    if (!user) {
      setMsg('Please login to vote on posts')
      setTimeout(() => setMsg(''), 3000)
      return
    }
    setVoting(true)
    try {
      const response = await votePost(postId, voteType)
      if (response.data.success) {
        setPost(response.data.data)
      }
    } catch (err) {
      console.error('Vote failed:', err)
      setMsg('Failed to vote. Please try again.')
      setTimeout(() => setMsg(''), 3000)
    } finally {
      setVoting(false)
    }
  }
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setMsg('Please login to comment')
      setTimeout(() => setMsg(''), 3000)
      return
    }

    if (!commentText.trim()) {
      setMsg('Please enter a comment')
      setTimeout(() => setMsg(''), 3000)
      return
    }

    setSubmittingComment(true)
    try {
      const response = await createComment(postId, { content: commentText })
      if (response.data.success) {
        setComments(prev => [...prev, response.data.data])
        setCommentText('')
      }
    } catch (err) {
      console.error('Comment failed:', err)
      setMsg('Failed to post comment. Please try again.')
      setTimeout(() => setMsg(''), 3000)
    } finally {
      setSubmittingComment(false)
    }
  }
  
    const handleBookmark = async () => {
    if (!user) {
      setMsg('Please login to bookmark posts')
      setTimeout(() => setMsg(''), 3000)
      return
    }
    // ... rest unchanged

    setBookmarking(true)
    try {
      const response = await toggleBookmark(postId)
      if (response.data.success) {
        setPost(response.data.data)
      }
    } catch (err) {
      console.error('Bookmark failed:', err)
    } finally {
      setBookmarking(false)
    }
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      await sharePost(postId)
      
            // Copy link to clipboard
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      
      setMsg('Link copied to clipboard! 🎉')
      setTimeout(() => setMsg(''), 3000)
      
      // Update share count
      setPost(prev => ({
        ...prev,
        shares: (prev.shares || 0) + 1
      }))
    } catch (err) {
      console.error('Share failed:', err)
      // Fallback: just copy link
      const url = window.location.href
      window.prompt('Copy this link:', url)
    } finally {
      setSharing(false)
    }
  }

  const getUserInitials = (username) => {
    if (!username) return '?'
    return username.charAt(0).toUpperCase()
  }

  if (loading) return <LoadingSpinner text="Loading post..." />
  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-600 text-lg mb-4">Error: {error}</div>
      <button 
        onClick={() => navigate('/posts')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Posts
      </button>
    </div>
  )
  if (!post) return <div className="text-center py-12">Post not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-12">
      <div className="max-w-5xl mx-auto space-y-8 p-6">

                {/* ✅ Message Banner */}
        {msg && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 flex justify-between items-center animate-fade-in">
            <span>{msg}</span>
            <button 
              onClick={() => setMsg('')} 
              className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
            >
              ✕
            </button>
          </div>
        )}
      {/* Back Button */}
      <Link to="/posts" className="inline-flex items-center text-blue-600 hover:underline font-medium">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Opportunities
      </Link>

      {/* Main Post Card */}
      <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in border-gradient">
        {/* Category Badge */}
        <div className="mb-6">
          <span className={`
            inline-block px-4 py-2 text-sm font-semibold rounded-full
            ${post.category === 'internship' ? 'bg-blue-100 text-blue-800' : ''}
            ${post.category === 'gig' ? 'bg-purple-100 text-purple-800' : ''}
            ${post.category === 'volunteer' ? 'bg-green-100 text-green-800' : ''}
            ${post.category === 'event' ? 'bg-orange-100 text-orange-800' : ''}
            ${post.category === 'other' ? 'bg-gray-100 text-gray-800' : ''}
          `}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight text-shadow-lg animate-slide-in-left">{post.title}</h1>
        
        {/* Author & Meta Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            {post.author?.profile?.avatar ? (
              <img 
                src={post.author.profile.avatar} 
                alt={post.author.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                {getUserInitials(post.author?.username || post.author?.profile?.firstName)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-lg">
              {post.author?.username || `${post.author?.profile?.firstName || ''} ${post.author?.profile?.lastName || ''}`.trim() || 'Anonymous'}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <span>{new Date(post.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">{post.content}</p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Voting Section */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => handleVote('upvote')}
            disabled={voting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition disabled:opacity-50 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{post.upvotes || 0} Upvotes</span>
          </button>
          
          <button
            onClick={() => handleVote('downvote')}
            disabled={voting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition disabled:opacity-50 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{post.downvotes || 0} Downvotes</span>
          </button>
          
          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            disabled={bookmarking}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-50 font-medium ${
              post.bookmarkedBy?.includes(user?._id)
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill={post.bookmarkedBy?.includes(user?._id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{post.bookmarkedBy?.length || 0} Saved</span>
          </button>
          
          {/* Share Button */}
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition disabled:opacity-50 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>{post.shares || 0} Shares</span>
          </button>
        </div>
      </Card>

      {/* Comments Section */}
      <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-slide-in-right border-gradient">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gradient text-shadow">
            Comments ({comments.length})
          </h2>
        </div>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={submittingComment}
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
            <p className="text-gray-600 mb-3">Want to join the conversation?</p>
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login to comment →
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">💬</div>
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex gap-4">
                  {/* Commenter Avatar */}
                  <div className="flex-shrink-0">
                    {comment.author?.profile?.avatar ? (
                      <img 
                        src={comment.author.profile.avatar} 
                        alt={comment.author.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold">
                        {getUserInitials(comment.author?.username || comment.author?.profile?.firstName)}
                      </div>
                    )}
                  </div>
                  
                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">
                        {comment.author?.username || comment.author?.profile?.firstName || 'Anonymous'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('en-KE')}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
      </div>
    </div>
  )
}
