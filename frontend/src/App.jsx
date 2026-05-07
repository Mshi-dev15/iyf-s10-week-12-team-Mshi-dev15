import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Posts from './pages/Posts'

export default function App() {
  return (
    <Routes>
      {/* Public routes - no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes WITH layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Route>
      
      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  )
}