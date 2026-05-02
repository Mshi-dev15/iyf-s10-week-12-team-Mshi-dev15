import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Layout() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                BridgeKE
              </span>
            </NavLink>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/posts" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`
                }
              >
                Opportunities
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`
                }
              >
                About
              </NavLink>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/create-post" 
                    className="hidden sm:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all font-medium"
                  >
                    + Post Opportunity
                  </NavLink>
                  <div className="hidden sm:flex items-center gap-2 text-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium">{user?.username}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="text-gray-700 hover:text-emerald-600 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all font-medium"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  BridgeKE
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Connecting Kenyan youth with meaningful opportunities in their communities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><NavLink to="/posts" className="text-gray-600 hover:text-emerald-600">Browse Opportunities</NavLink></li>
                <li><NavLink to="/create-post" className="text-gray-600 hover:text-emerald-600">Post Opportunity</NavLink></li>
                <li><NavLink to="/about" className="text-gray-600 hover:text-emerald-600">About Us</NavLink></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Connect With Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p>© 2026 BridgeKE 🇰🇪 | Bridging Kenyan Youth to Opportunities | Built with 💚 by IYF Weekend Academy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
