import { useParams, Link } from 'react-router-dom'

const samplePosts = [
  {
    _id: '1',
    title: 'Software Development Internship',
    description: 'Join our tech team as a software development intern. Learn React, Node.js, and modern web development practices while working on real projects.',
    category: 'internship',
    location: 'Nairobi',
    organizationName: 'TechHub Kenya',
    tags: ['react', 'javascript', 'paid'],
    requirements: ['Basic knowledge of JavaScript', 'Familiarity with React or willingness to learn', 'Strong problem-solving skills'],
    benefits: ['Monthly stipend', 'Mentorship from senior developers', 'Certificate of completion', 'Potential full-time offer']
  },
  {
    _id: '2',
    title: 'Community Health Volunteer',
    description: 'Support health awareness campaigns in rural communities across Kenya. Make a real difference in people\'s lives.',
    category: 'volunteering',
    location: 'Kisumu',
    organizationName: 'Health First NGO',
    tags: ['health', 'community'],
    requirements: ['Passion for community service', 'Good communication skills', 'Willingness to travel'],
    benefits: ['Transport allowance', 'Training provided', 'Impact certificate']
  }
]

export default function PostDetail() {
  const { postId } = useParams()
  const post = samplePosts.find(p => p._id === postId) || samplePosts[0]

  const categoryColors = {
    internship: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    gig: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    volunteering: 'bg-teal-100 text-teal-700 border-teal-200',
    event: 'bg-amber-100 text-amber-700 border-amber-200'
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunity not found</h2>
        <Link to="/posts" className="text-blue-600 hover:text-blue-700">
          ← Back to Opportunities
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link to="/posts" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          ← Back to Opportunities
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            <span className="text-gray-500 flex items-center gap-2">
              📍 {post.location}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <span className="font-medium">🏢 {post.organizationName}</span>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">{post.description}</p>
        </div>
      </div>

      {/* Requirements */}
      {post.requirements && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-3">
            {post.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {post.benefits && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
          <ul className="space-y-3">
            {post.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-600 mt-1">★</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Interested in this opportunity?</h3>
        <p className="text-blue-100 mb-6">Apply now and take the next step in your career journey!</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg">
          Apply Now
        </button>
      </div>
    </div>
  )
}
