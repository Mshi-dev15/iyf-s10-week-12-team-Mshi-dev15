import { useState } from 'react'
import { Link } from 'react-router-dom'

const samplePosts = [
  {
    _id: '1',
    title: 'Software Development Internship',
    description: 'Join our tech team as a software development intern. Learn React, Node.js, and modern web development.',
    category: 'internship',
    location: 'Nairobi',
    organizationName: 'TechHub Kenya',
    tags: ['react', 'javascript', 'paid']
  },
  {
    _id: '2',
    title: 'Community Health Volunteer',
    description: 'Support health awareness campaigns in rural communities across Kenya.',
    category: 'volunteering',
    location: 'Kisumu',
    organizationName: 'Health First NGO',
    tags: ['health', 'community']
  },
  {
    _id: '3',
    title: 'Digital Marketing Gig',
    description: 'Help local businesses grow their online presence through social media marketing.',
    category: 'gig',
    location: 'Mombasa',
    organizationName: 'Coast Digital Agency',
    tags: ['marketing', 'social-media', 'remote']
  },
  {
    _id: '4',
    title: 'Tech Innovation Summit 2026',
    description: 'Annual technology summit featuring workshops, networking, and startup pitches.',
    category: 'event',
    location: 'Nairobi',
    organizationName: 'Kenya Tech Alliance',
    tags: ['technology', 'networking', 'free']
  }
]

const categoryColors = {
  internship: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  gig: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  volunteering: 'bg-teal-100 text-teal-700 border-teal-200',
  event: 'bg-amber-100 text-amber-700 border-amber-200'
}

export default function Posts() {
  const [filter, setFilter] = useState('all')

  const filteredPosts = filter === 'all' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Opportunities</h1>
          <p className="text-purple-100 text-lg">Discover internships, gigs, volunteering, and events across Kenya</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['all', 'internship', 'gig', 'volunteering', 'event'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
              filter === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link 
            key={post._id} 
            to={`/posts/${post._id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.location}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.organizationName}</span>
                <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  View Details →
                </span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  )
}
