// frontend/src/components/Layout/Layout.jsx
import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Layout() {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4">
                <nav className="flex items-center justify-between max-w-6xl mx-auto">
                    <NavLink to="/" className="text-green-600 font-bold text-xl">
                        🇰🇪 BridgeKE
                    </NavLink>

                    <div className="flex items-center gap-6">
                        <NavLink to="/posts" className="text-gray-600 hover:text-green-600 text-sm font-medium">
                            Opportunities
                        </NavLink>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <NavLink to="/login" className="text-sm text-gray-600 hover:text-green-600 font-medium">
                                    Login
                                </NavLink>
                                <NavLink to="/register" className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* Page Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t px-6 py-4 text-center text-sm text-gray-500">
                © 2026 BridgeKE 🇰🇪 — Connecting Kenyan Youth with Opportunities
            </footer>
        </div>
    )
}