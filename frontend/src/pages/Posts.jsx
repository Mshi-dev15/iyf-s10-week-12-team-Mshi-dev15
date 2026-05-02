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
    tags: ['marketing', 'freelance']
  },
  {
    _id: '4',
    title: 'Youth Leadership Workshop',
    description: 'Two-day intensive workshop on leadership skills and community organizing.',
    category: 'event',
    location: 'Nakuru',
    organizationName: 'Youth Empowerment Initiative',
    tags: ['leadership', 'workshop']
  }
]

const categoryColors = {
  internship: 'bg-blue-100 text-blue-700',
  gig: 'bg-purple-100 text-purple-700',
  volunteering: 'bg-green-100 text-green-700',
  event: 'bg-orange-100 text-orange-700'
}

export default function Posts() {
  const [filter, setFilter] = useState('all')

  const filteredPosts = filter === 'all' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
        <p className="text-blue-100">Discover internships, gigs, volunteering, and events across Kenya</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {['all', 'internship', 'gig', 'volunteering', 'event'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <div className="bg-white rounded-lg shadow hover:shadow-xl transition p-6 border-2 border-transparent hover:border-blue-200">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                categoryColors[post.category]
              }`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {post.description}
              </p>

              {post.organizationName && (
                <div className="text-sm text-gray-500 mb-2">
                  🏢 {post.organizationName}
                </div>
              )}

              <div className="text-sm text-gray-500 mb-4">
                📍 {post.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}
