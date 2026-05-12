// frontend/src/context/AuthContext.jsx
// F5 Task — Global auth state: login, register, logout methods
// Wraps the whole app so any component can access the current user

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';  // ✅ Add this line

const AuthContext = createContext(null);


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
        api.get('/auth/me')  // ✅ NEW: axios, token auto-added
            .then((res) => {
                const authUser = getAuthUser(res.data);  // Note: res.data, not res
                if (authUser?._id) setUser(authUser);
                else localStorage.removeItem('token');
            })
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
}, []);

    // ── Login ─────────────────────────────────────────────────────────────────
    const login = async (email, password) => {
    try {
        const res = await api.post('/auth/login', { email, password });
        const authUser = getAuthUser(res.data);
        localStorage.setItem('token', authUser.token);
        setUser(authUser);
        return authUser;
    } catch (error) {
        const data = error.response?.data;
        throw new Error(getErrorMessage(data, 'Login failed'));
    }
};

    // ── Register ──────────────────────────────────────────────────────────────
    const register = async (userData) => {
    try {
        const res = await api.post('/auth/register', userData);  // ✅ NEW
        const authUser = getAuthUser(res.data);
        localStorage.setItem('token', authUser.token);
        setUser(authUser);
        return authUser;
    } catch (error) {
        const data = error.response?.data;
        throw new Error(getErrorMessage(data, 'Registration failed'));
    }
};

    // ── Logout ────────────────────────────────────────────────────────────────
    const logout = async () => {
    try {
        await api.post('/auth/logout');  // ✅ NEW: token auto-added, ignore response
    } catch (error) {
        // Ignore logout errors (token might already be expired)
        console.warn('Logout API call failed:', error.message);
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
