// frontend/src/context/AuthContext.jsx
// F5 Task — Global auth state: login, register, logout methods
// Wraps the whole app so any component can access the current user

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getErrorMessage = (data, fallback) => (
    data?.error?.message || data?.message || data?.error || fallback
);

const getAuthUser = (data) => data?.data || data;

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
                    const authUser = getAuthUser(data);
                    if (authUser?._id) setUser(authUser);
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

        if (!res.ok) throw new Error(getErrorMessage(data, 'Login failed'));

        const authUser = getAuthUser(data);
        localStorage.setItem('token', authUser.token);
        setUser(authUser);
        return authUser;
    };

    // ── Register ──────────────────────────────────────────────────────────────
    const register = async (userData) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(getErrorMessage(data, 'Registration failed'));

        const authUser = getAuthUser(data);
        localStorage.setItem('token', authUser.token);
        setUser(authUser);
        return authUser;
    };

    // ── Logout ────────────────────────────────────────────────────────────────
    const logout = async () => {
        const token = localStorage.getItem('token');

        try {
            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
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
