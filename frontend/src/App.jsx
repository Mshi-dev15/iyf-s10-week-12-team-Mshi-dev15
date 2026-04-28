import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes go here */}
      <Route path="/" element={
        <ProtectedRoute>
          <h1>🇰🇪 CommunityHub Home — Coming Soon</h1>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App