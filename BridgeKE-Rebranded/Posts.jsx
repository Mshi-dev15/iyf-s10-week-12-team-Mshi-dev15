import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'

// Sample data for demonstration
const samplePosts = [
  {
    _id: '1',
    title: 'Software Development Internship',
    description: 'Join our tech team as a software development intern. Learn React, Node.js, and modern web development practices.',
    category: 'internship',
    location: 'Nairobi',
    county: 'Nairobi',
    organizationName: 'TechHub Kenya',
    createdAt: new Date().toISOString(),
    tags: ['react', 'javascript', 'paid']
  },
  {
    _id: '2',
    title: 'Community Health Volunteer',
    description: 'Support health awareness campaigns in rural communities. Make a real difference in people\'s lives.',
    category: 'volunteering',
    location: 'Kisumu',
    county: 'Kisumu',
    organizationName: 'Health First NGO',
    createdAt: new Date().toISOString(),
    tags: ['health', 'community', 'remote']
  },
  {
    _id: '3',
    title: 'Digital Marketing Gig',
    description: 'Help local businesses grow their online presence through social media marketing and content creation.',
    category: 'gig',
    location: 'Mombasa',
    county: 'Mombasa',
    organizationName: 'Coast Digital Agency',
    createdAt: new Date().toISOString(),
    tags: ['marketing', 'social-media', 'freelance']
  },
  {
    _id: '4',
    title: 'Youth Leadership Workshop',
    description: 'Two-day intensive workshop on leadership skills, public speaking, and community organizing.',
    category: 'event',
    location: 'Nakuru',
    county: 'Nakuru',
    organizationName: 'Youth Empowerment Initiative',
    createdAt: new Date().toISOString(),
    tags: ['leadership', 'workshop', 'free']
  },
  {
    _id: '5',
    title: 'Graphic Design Internship',
    description: 'Creative opportunity for aspiring designers. Work on real projects with experienced mentors.',
    category: 'internship',
    location: 'Eldoret',
    county: 'Uasin Gishu',
    organizationName: 'Creative Studios KE',
    createdAt: new Date().toISOString(),
    tags: ['design', 'creative', 'paid']
  },
  {
    _id: '6',
    title: 'Environmental Conservation Project',
    description: 'Join our tree planting and environmental conservation efforts in your community.',
    category: 'volunteering',
    location: 'Thika',
    county: 'Kiambu',
    organizationName: 'Green Kenya Foundation',
    createdAt: new Date().toISOString(),
    tags: ['environment', 'conservation', 'weekend']
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
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
          <p className="text-teal-100 text-lg">Discover internships, gigs, volunteering, and events across Kenya</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'internship', 'gig', 'volunteering', 'event'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === category
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Link key={post._id} to={`/posts/${post._id}`}>
            <Card className="h-full hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-emerald-200 group">
              <div className="p-6">
                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${
                  categoryColors[post.category]
                }`}>
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Organization */}
                {post.organizationName && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{post.organizationName}</span>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{post.location}, {post.county}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action */}
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="outline" fullWidth size="small" className="group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  )
}
