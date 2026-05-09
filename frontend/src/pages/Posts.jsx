// frontend/src/pages/Posts.jsx
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useAuth } from "../context/AuthContext"
import PagePlaceholder from "../components/shared/PagePlaceholder"
import Button from "../components/shared/Button"
import { getPosts, votePost } from "../services/postsAPI"

export default function Posts() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const { data, loading, error } = useFetch(() => getPosts({ category }))
  const { isAuthenticated } = useAuth()
  const [posts, setPosts] = useState([])
  const [votingPostId, setVotingPostId] = useState(null)
  const [voteError, setVoteError] = useState(null)

  useEffect(() => {
    setPosts(data?.posts || [])
  }, [data])

  const handleVote = async (event, postId, voteType) => {
    event.preventDefault()
    event.stopPropagation()
    setVoteError(null)

    if (!isAuthenticated) {
      setVoteError('Please sign in to vote on opportunities')
      return
    }

    setVotingPostId(postId)

    try {
      const updatedPost = await votePost(postId, voteType)
      setPosts((current) => current.map((post) => (
        (post._id || post.id) === postId ? updatedPost : post
      )))
    } catch (err) {
      setVoteError(err.response?.data?.error?.message || err.message || 'Failed to vote on post')
    } finally {
      setVotingPostId(null)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <PagePlaceholder rows={4} />
      </div>
    )
  }
  
  if (error) {
    return <p className="text-center py-8 text-red-600">Error: {error.message}</p>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Opportunities` : 'Opportunities'}
        </h1>
        {category && (
          <Link to="/posts" className="text-blue-600 hover:underline text-sm">
            View All Opportunities
          </Link>
        )}
      </div>

      {voteError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {voteError}
        </div>
      )}
      
      {posts.map((post) => {
        const postId = post._id || post.id
        const authorId = post.author?._id || post.author?.id

        return (
        <Link
          to={`/posts/${postId}`}
          key={postId}
          className="block border rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              {post.content && (
                <p className="text-gray-600 text-sm mt-1">
                  {post.content.substring(0, 100)}...
                </p>
              )}
              {(post.author?.username || post.author?.profile?.firstName) && (
                <p className="text-xs text-gray-500 mt-2">
                  Posted by{' '}
                  <Link
                    to={`/users/${authorId}`}
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.author.username || `${post.author.profile.firstName} ${post.author.profile.lastName || ''}`.trim()}
                  </Link>
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="small"
              loading={votingPostId === postId}
              disabled={votingPostId === postId}
              onClick={(event) => handleVote(event, postId, 'upvote')}
              className="shrink-0"
            >
              Like ({post.likes || 0})
            </Button>
          </div>
        </Link>
        )
      })}
      
      {posts.length === 0 && (
        <p className="text-gray-500 text-center py-4">No opportunities found</p>
      )}
    </div>
  )
}
