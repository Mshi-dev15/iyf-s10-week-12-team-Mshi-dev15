// frontend/src/components/Layout/Layout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Layout() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform">
            🇰🇪 BridgeKE
          </NavLink>
          
          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-gradient font-semibold text-shadow' 
                  : 'text-gray-600 hover:text-gradient transition font-medium'
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/posts" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-gradient font-semibold text-shadow' 
                  : 'text-gray-600 hover:text-gradient transition font-medium'
              }
            >
              Opportunities
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive 
                  ? 'text-gradient font-semibold text-shadow' 
                  : 'text-gray-600 hover:text-gradient transition font-medium'
              }
            >
              About
            </NavLink>
            
            {/* Auth-aware section */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink 
                  to="/create-post" 
                  className="btn-primary text-sm"
                >
                  + Post Opportunity
                </NavLink>
                <span className="text-gray-700 text-sm font-medium">Hi, {user?.username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition text-sm font-medium hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="text-gray-600 hover:text-gradient transition text-sm font-medium">
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="btn-primary text-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-100 via-blue-50 to-indigo-50 border-t border-gray-200 py-8 text-center">
        <p className="text-gray-700 font-medium">© 2026 BridgeKE Kenya 🇰🇪 | Built with ❤️ by IYF Weekend Academy</p>
        <p className="text-gray-500 text-sm mt-2">Empowering Kenyan Youth Through Opportunities</p>
      </footer>
    </div>
  )
}
