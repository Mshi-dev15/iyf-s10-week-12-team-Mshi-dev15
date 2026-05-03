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
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            BridgeKE
          </NavLink>
          
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
            >
              Home
            </NavLink>
            <NavLink 
              to="/posts" 
              className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
            >
              Opportunities
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
            >
              About
            </NavLink>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink 
                  to="/create-post" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Post Opportunity
                </NavLink>
                <span className="text-gray-700">Hi, {user?.username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>


      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Outlet />
      </main>


      <footer className="bg-gray-50 border-t py-6 text-center text-gray-600">
        <p>© 2026 BridgeKE Kenya 🇰🇪 | Built with ❤️ by IYF Weekend Academy</p>
      </footer>
    </div>
  )
}
