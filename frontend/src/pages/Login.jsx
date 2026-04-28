// frontend/src/pages/Login.jsx
// F5 Task — Login form with error handling and redirect after login

import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect back to where the user was trying to go, or home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Header */}
                <h1 style={styles.title}>🇰🇪 CommunityHub</h1>
                <h2 style={styles.subtitle}>Welcome back</h2>
                <p style={styles.description}>Sign in to discover opportunities near you</p>

                {/* Error Message */}
                {error && <div style={styles.error}>{error}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={styles.input}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={loading ? styles.buttonDisabled : styles.button}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Link to Register */}
                <p style={styles.footer}>
                    Don't have an account?{' '}
                    <Link to="/register" style={styles.link}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0fdf4',
        padding: '20px'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#16a34a',
        textAlign: 'center',
        margin: '0 0 8px'
    },
    subtitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#111',
        textAlign: 'center',
        margin: '0 0 8px'
    },
    description: {
        fontSize: '14px',
        color: '#6b7280',
        textAlign: 'center',
        margin: '0 0 24px'
    },
    error: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        marginBottom: '16px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
    },
    input: {
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
        outline: 'none'
    },
    button: {
        backgroundColor: '#16a34a',
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '8px'
    },
    buttonDisabled: {
        backgroundColor: '#86efac',
        color: '#fff',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'not-allowed',
        marginTop: '8px'
    },
    footer: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#6b7280',
        marginTop: '20px'
    },
    link: {
        color: '#16a34a',
        fontWeight: '500',
        textDecoration: 'none'
    }
};