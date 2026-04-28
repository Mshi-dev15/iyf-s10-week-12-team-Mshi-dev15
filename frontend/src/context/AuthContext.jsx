// frontend/src/context/AuthContext.jsx
// F5 Task — Global auth state: login, register, logout methods
// Wraps the whole app so any component can access the current user

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── Check for existing session on page load ───────────────────────────────
    // If a token exists in localStorage, fetch the current user from the API
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data._id) setUser(data);
                    else localStorage.removeItem('token'); // token is invalid
                })
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // ── Login ─────────────────────────────────────────────────────────────────
    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Login failed');

        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    // ── Register ──────────────────────────────────────────────────────────────
    const register = async (userData) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Registration failed');

        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    // ── Logout ────────────────────────────────────────────────────────────────
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };

    // Don't render children until we know if user is logged in or not
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// ── Custom Hook ───────────────────────────────────────────────────────────────
// Usage: const { user, login, logout, isAuthenticated } = useAuth();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};