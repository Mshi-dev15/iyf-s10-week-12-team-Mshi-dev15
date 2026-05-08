// frontend/src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get redirect path (default to home)
  const from = location.state?.from?.pathname || '/'
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate(from, { replace: true }) // ✅ Better redirect logic from PR
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      {/* ✅ Back link from PR */}
      <div className="fixed top-4 left-4">
        <Link to="/" className="text-gray-500 hover:text-green-600 text-sm flex items-center gap-1">
          ← Back to Home
        </Link>
      </div>
      
      {/* ✅ Use shared Card component */}
      <Card className="p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">🇰🇪 BridgeKE</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500">Sign in to discover opportunities near you</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* ✅ Use shared Button component */}
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={loading}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  )
}