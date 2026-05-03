import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BridgeKE</h1>
          <p className="text-xl text-purple-100">Bridging Kenyan youth with opportunities that matter 🇰🇪</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                BridgeKE is a platform dedicated to bridging the gap between talented young 
                Kenyans and meaningful opportunities. We believe every young person deserves 
                access to internships, gigs, volunteering positions, and events that can 
                transform their careers.
              </p>
              <p className="text-lg text-gray-600">
                Built by students of IYF Weekend Academy, our platform showcases the power 
                of modern web development to solve real community challenges.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Connect Talent</h3>
                    <p className="text-gray-600 text-sm">Link skilled youth with organizations seeking fresh talent</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Impact</h3>
                    <p className="text-gray-600 text-sm">Focus on opportunities across Kenya's major cities</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Innovation</h3>
                    <p className="text-gray-600 text-sm">Modern tech stack powering community solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Opportunities Posted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">47</div>
              <div className="text-gray-600">Counties Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Today!</h2>
            <p className="text-lg text-blue-100 mb-8">
              Whether you're looking for opportunities or want to post them, BridgeKE is your platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Create Account
              </Link>
              <Link 
                to="/posts" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Browse Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
