import Card from '../components/shared/Card'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About BridgeKE
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Bridging Kenyan youth with opportunities that matter 🇰🇪
        </p>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            BridgeKE is a platform dedicated to bridging the gap between talented young 
            professionals and meaningful opportunities across Kenya. Whether you're looking 
            for internships, freelance gigs, volunteer positions, or networking events, 
            we've got you covered.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To empower Kenyan youth by providing easy access to career-building opportunities, 
            fostering skill development, and creating a supportive community of learners and 
            professionals.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>🎯 Curated internship opportunities with top organizations</li>
            <li>💼 Flexible gig work for freelancers and side hustlers</li>
            <li>🤝 Volunteer positions to give back to the community</li>
            <li>📅 Networking events and workshops</li>
            <li>👥 A supportive community of like-minded individuals</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Built With ❤️</h2>
          <p className="text-gray-600 mb-4">
            BridgeKE is a project by IYF Weekend Academy students, built with modern 
            web technologies including React, Node.js, MongoDB, and TailwindCSS.
          </p>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Get Started Today!</h3>
            <p className="text-blue-800 mb-4">
              Join our growing community and discover opportunities tailored for you.
            </p>
            <a 
              href="/register" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
