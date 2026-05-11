// frontend/src/pages/Home.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { getTrendingPosts } from '../services/engagementAPI'

export default function Home() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [trendingPosts, setTrendingPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch trending posts
    const fetchTrending = async () => {
      try {
        const response = await getTrendingPosts(3)
        if (response.data.success) {
          setTrendingPosts(response.data.data)
        }
      } catch (err) {
        console.error('Failed to fetch trending posts:', err)
      }
    }
    
    fetchTrending()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading...</div>
  }

  const categories = [
    { 
      label: 'Internships', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      description: 'Find paid internship opportunities',
      path: '/posts?category=internship'
    },
    { 
      label: 'Gigs', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      description: 'Short-term freelance projects',
      path: '/posts?category=gig'
    },
    { 
      label: 'Volunteering', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      description: 'Give back to your community',
      path: '/posts?category=volunteer'
    },
    { 
      label: 'Events', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-600 to-orange-700',
      description: 'Networking and learning events',
      path: '/posts?category=event'
    },
  ]

  const handleCardClick = (path) => {
    navigate(path)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="gradient-primary rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden animate-gradient">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in text-shadow-lg">
            🇰🇪 Welcome to BridgeKE
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto text-shadow">
            Connecting Kenyan youth with local internships, gigs, volunteering and events
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for opportunities..."
                className="w-full px-6 py-4 pr-12 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 glass-card"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          {user ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
              <p className="text-blue-100 text-lg">
                Welcome back, <span className="font-semibold text-white">{user?.username || user?.email?.split('@')[0]}</span>! 👋
              </p>
              <p className="text-blue-200 text-sm mt-2">Ready to discover new opportunities?</p>
            </div>
          ) : (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                Get Started →
              </Link>
              <Link to="/posts" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                Browse Opportunities
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Trending Posts Section */}
      {trendingPosts.length > 0 && (
        <div className="animate-slide-in-left">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900 text-gradient-fire">Trending Now</h2>
            <span className="badge-hot">HOT 🔥</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingPosts.map((post, index) => (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="group card-modern hover-lift border-gradient"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl font-bold text-orange-500">#{index + 1}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>{post.views || 0}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{post.upvotes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.commentsCount || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories Grid - Interactive Cards */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Explore Opportunities</h2>
        <p className="text-gray-600 text-center mb-8">Choose a category to get started</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={cat.label}
              onClick={() => handleCardClick(cat.path)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                bg-gradient-to-br ${hoveredCard === index ? cat.hoverColor : cat.color}
                rounded-2xl p-8 text-white cursor-pointer
                transform transition-all duration-500 ease-out
                hover:scale-110 hover:-translate-y-3
                shadow-lg hover:shadow-2xl hover-glow
                relative overflow-hidden group animate-fade-in
              `}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-white mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{cat.label}</h3>
                <p className="text-white/80 text-sm mb-4">{cat.description}</p>
                <div className="flex items-center text-white/90 text-sm font-medium">
                  <span>Explore</span>
                  <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="gradient-mesh rounded-2xl p-8 border border-gray-200 animate-slide-in-right shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="hover-scale">
            <div className="text-4xl font-bold text-gradient mb-1">500+</div>
            <div className="text-gray-700 text-sm font-medium">Active Opportunities</div>
          </div>
          <div className="hover-scale">
            <div className="text-4xl font-bold text-gradient-ocean mb-1">1,200+</div>
            <div className="text-gray-700 text-sm font-medium">Registered Users</div>
          </div>
          <div className="hover-scale">
            <div className="text-4xl font-bold text-gradient-fire mb-1">50+</div>
            <div className="text-gray-700 text-sm font-medium">Partner Organizations</div>
          </div>
          <div className="hover-scale">
            <div className="text-4xl font-bold text-gradient mb-1">47</div>
            <div className="text-gray-700 text-sm font-medium">Counties Covered</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!user && (
        <div className="gradient-purple rounded-2xl p-10 text-white text-center shadow-xl animate-bounce-in hover-glow">
          <h3 className="text-3xl font-bold mb-4 text-shadow-lg">Ready to Start Your Journey?</h3>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto text-shadow">
            Join thousands of Kenyan youth who are already finding amazing opportunities on BridgeKE
          </p>
          <Link to="/register" className="inline-block bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-purple-50 transition-all transform hover:scale-110 shadow-lg btn-primary">
            Create Free Account →
          </Link>
        </div>
      )}
    </div>
  )
}