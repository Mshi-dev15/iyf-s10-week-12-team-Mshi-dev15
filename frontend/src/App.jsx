import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'

// ✅ All page imports
import Home from './pages/Home'
import Posts from './pages/Posts'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        
        {/* ✅ New routes */}
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        
        {/* Catch-all 404 */}
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  )
}