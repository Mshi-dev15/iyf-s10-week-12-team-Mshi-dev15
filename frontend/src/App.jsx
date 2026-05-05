import { useState } from 'react'
import Button from './components/shared/Button/Button'
import Input from './components/shared/Input/Input'
import Card from './components/shared/Card/Card'
import Avatar from './components/shared/Avatar'

function App() {
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇰🇪</span>
            <h1 className="text-2xl font-bold text-gray-900">CommunityHub</h1>
          </div>
          <nav className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Opportunities</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering Kenyan Youth 🇰🇪
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover internships, gigs, volunteering, and events near you. 
            Because talent is everywhere, but opportunity isn't.
          </p>
        </div>

        {/* Component Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Input Demo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 User Input</h3>
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="primary" className="mt-4 w-full">
              Submit
            </Button>
          </Card>

          {/* Card 2: Button Variants */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4"> Button Styles</h3>
            <div className="space-y-3">
              <Button variant="primary" fullWidth>Primary</Button>
              <Button variant="secondary" fullWidth>Secondary</Button>
              <Button variant="outline" fullWidth>Outline</Button>
            </div>
          </Card>

          {/* Card 3: Avatar */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 User Profile</h3>
            <div className="flex items-center gap-4">
              <Avatar name="John Doe" size="large" />
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Nairobi, Kenya</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="mb-6 text-blue-100">Join thousands of young Kenyans finding opportunities</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="large">Create Account</Button>
              <Button variant="outline" size="large" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 CommunityHub Kenya 🇰🇪 | Built with ❤️ by IYF Weekend Academy
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App