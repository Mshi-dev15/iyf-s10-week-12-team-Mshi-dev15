import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">BridgeKE</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover internships, gigs, volunteering, and events happening near you in Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/posts" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Browse Opportunities
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/register" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose BridgeKE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Curated Opportunities</h3>
              <p className="text-gray-600">Hand-picked internships, gigs, and volunteer positions tailored for Kenyan youth</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🇰🇪</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Local Focus</h3>
              <p className="text-gray-600">Opportunities across all major cities in Kenya - Nairobi, Mombasa, Kisumu, and more</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Career Growth</h3>
              <p className="text-gray-600">Build your skills, gain experience, and connect with potential employers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of young Kenyans already discovering opportunities on BridgeKE</p>
          <Link 
            to={isAuthenticated ? "/create-post" : "/register"}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            {isAuthenticated ? "Post an Opportunity" : "Create Free Account"}
          </Link>
        </div>
      </section>
    </div>
  )
}
