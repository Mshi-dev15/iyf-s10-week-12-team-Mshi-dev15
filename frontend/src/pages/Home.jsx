// frontend/src/pages/Home.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading...</div>
  }

  const categories = [
    { 
      label: 'Internships', 
      emoji: '💼',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      description: 'Find paid internship opportunities',
      path: '/posts?category=internship'
    },
    { 
      label: 'Gigs', 
      emoji: '⚡',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      description: 'Short-term freelance projects',
      path: '/posts?category=gig'
    },
    { 
      label: 'Volunteering', 
      emoji: '🤝',
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      description: 'Give back to your community',
      path: '/posts?category=volunteer'
    },
    { 
      label: 'Events', 
      emoji: '🎯',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-600 to-orange-700',
      description: 'Networking and learning events',
      path: '/posts?category=event'
    },
  ]

  const handleCardClick = (path) => {
    navigate(path)
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            🇰🇪 Welcome to BridgeKE
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Connecting Kenyan youth with local internships, gigs, volunteering and events
          </p>
          
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
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:-translate-y-2
                shadow-lg hover:shadow-2xl
                relative overflow-hidden group
              `}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {cat.emoji}
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
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-gray-600 text-sm">Active Opportunities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-1">1,200+</div>
            <div className="text-gray-600 text-sm">Registered Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-1">50+</div>
            <div className="text-gray-600 text-sm">Partner Organizations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-1">47</div>
            <div className="text-gray-600 text-sm">Counties Covered</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!user && (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-10 text-white text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            Join thousands of Kenyan youth who are already finding amazing opportunities on BridgeKE
          </p>
          <Link to="/register" className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg">
            Create Free Account →
          </Link>
        </div>
      )}
    </div>
  )
}