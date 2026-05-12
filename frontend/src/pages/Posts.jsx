// frontend/src/pages/Posts.jsx
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useFetch from "../hooks/useFetch"
import { getPosts } from "../services/postsAPI"
import { votePost } from "../services/votesAPI"

export default function Posts() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category')
  
  const { data, loading, error, refetch } = useFetch(getPosts)
  const [posts, setPosts] = useState([])
  const [msg, setMsg] = useState('')
  const [votingPosts, setVotingPosts] = useState({})

  useEffect(() => {
    if (data?.data) {
      let filteredPosts = data.data
      if (categoryFilter) {
        filteredPosts = filteredPosts.filter(post => post.category === categoryFilter)
      }
      setPosts(filteredPosts)
    }
  }, [data, categoryFilter])

    const handleVote = async (postId, voteType) => {
    if (!user) {
      setMsg('Please login to vote on posts')  // ✅ NEW
      setTimeout(() => setMsg(''), 3000)       // Auto-dismiss after 3s
      return
    }
    setVotingPosts(prev => ({ ...prev, [postId]: true }))
    try {
      const response = await votePost(postId, voteType)
      if (response.data.success) {
        // Update the post in local state
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId ? response.data.data : post
          )
        )
      }
    } catch (err) {
      console.error('Vote failed:', err)
      setMsg('Failed to vote. Please try again.')  // ✅ NEW
      setTimeout(() => setMsg(''), 3000)
    } finally {
      setVotingPosts(prev => ({ ...prev, [postId]: false }))
    }
  }

  const getUserInitials = (username) => {
    if (!username) return '?'
    return username.charAt(0).toUpperCase()
  }

  const getCategoryColor = (category) => {
    const colors = {
      internship: 'bg-blue-100 text-blue-800 border-blue-200',
      gig: 'bg-purple-100 text-purple-800 border-purple-200',
      volunteer: 'bg-green-100 text-green-800 border-green-200',
      event: 'bg-orange-100 text-orange-800 border-orange-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors.other
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error loading opportunities</div>
        <button 
          onClick={refetch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
       
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

       
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-3 text-shadow">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Opportunities` : 'All Opportunities'}
          </h1>
          <p className="text-gray-600 text-lg">
            {posts.length} {posts.length === 1 ? 'opportunity' : 'opportunities'} found
          </p>
        </div>
      
      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link 
            key={post._id || post.id} 
            to={`/posts/${post._id || post.id}`}
            className="block group animate-fade-in"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="card-modern hover-lift bg-white/90 backdrop-blur-sm border-gradient p-6">
              <div className="flex items-start gap-4">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  {post.author?.profile?.avatar ? (
                    <img 
                      src={post.author.profile.avatar} 
                      alt={post.author.username}
                      className="w-14 h-14 rounded-full object-cover border-3 border-gradient-to-br from-blue-400 to-purple-500 group-hover:border-blue-500 transition shadow-lg"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl border-3 border-white shadow-lg group-hover:scale-110 transition-transform">
                      {getUserInitials(post.author?.username || post.author?.profile?.firstName || 'U')}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-gradient transition line-clamp-2 text-shadow">
                        {post.title}
                      </h3>
                      
                      {/* Category Badge */}
                      {post.category && (
                        <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Preview */}
                  {post.content && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.content.substring(0, 150)}...
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">
                      {post.author?.username || post.author?.profile?.firstName || 'Anonymous'}
                    </span>
                    {post.location && (
                      <>
                        <span>•</span>
                        <span>📍 {post.location}</span>
                      </>
                    )}
                    {post.createdAt && (
                      <>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('en-KE')}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Voting Section */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2" onClick={(e) => e.preventDefault()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVote(post._id, 'upvote')
                    }}
                    disabled={votingPosts[post._id]}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-600 hover:text-green-600 transition disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{post.upvotes || 0}</span>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVote(post._id, 'downvote')
                    }}
                    disabled={votingPosts[post._id]}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{post.downvotes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600 mb-6">
              {categoryFilter ? `No ${categoryFilter} opportunities available yet` : 'Check back later for new opportunities'}
            </p>
            {categoryFilter && (
              <Link to="/posts" className="text-blue-600 hover:underline font-medium">
                View all opportunities →
              </Link>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}