// frontend/src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
    const { user, loading } = useAuth()

    if (loading) {
        return <div className="p-8 text-center text-gray-600">Loading...</div>
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-green-600 rounded-2xl p-10 text-white text-center">
                <h1 className="text-4xl font-bold mb-3">
                    🇰🇪 Welcome to BridgeKE
                </h1>
                <p className="text-green-100 text-lg mb-6">
                    Connecting Kenyan youth with local internships, gigs, volunteering and events
                </p>
                
                {user ? (
                    <p className="text-green-100">
                        Welcome back, <span className="font-semibold text-white">{user?.name || user?.email?.split('@')[0]}</span>!
                    </p>
                ) : (
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-50">
                            Get Started
                        </Link>
                        <Link to="/posts" className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700">
                            Browse Opportunities
                        </Link>
                    </div>
                )}
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Internships', emoji: '💼' },
                    { label: 'Gigs', emoji: '⚡' },
                    { label: 'Volunteering', emoji: '🤝' },
                    { label: 'Events', emoji: '🎯' },
                ].map((cat) => (
                    <div 
                        key={cat.label}
                          style={{ backgroundColor: '#dcfce7', border: '1px solid #86efac' }}
    className="rounded-xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
                    
                        <div className="text-3xl mb-2">{cat.emoji}</div>
                        <p className="font-medium text-gray-700">{cat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}