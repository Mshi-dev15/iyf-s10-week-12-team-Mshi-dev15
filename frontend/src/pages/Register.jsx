// frontend/src/pages/Register.jsx
// F5 Task — Registration form with role selection and location fields

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const COUNTIES = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
    'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega',
    'Nyeri', 'Meru', 'Machakos', 'Kilifi', 'Kisii'
];

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        county: '',
        town: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(formData);
            navigate('/');
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
                <h2 style={styles.subtitle}>Create your account</h2>
                <p style={styles.description}>Join thousands of Kenyan youth finding opportunities</p>

                {/* Error Message */}
                {error && <div style={styles.error}>{error}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Kamau"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            style={styles.input}
                        />
                    </div>

                    {/* Role Selection */}
                    <div style={styles.field}>
                        <label style={styles.label}>I am a...</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="user">Youth seeking opportunities</option>
                            <option value="organization">Organization posting opportunities</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div style={styles.row}>
                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>County</label>
                            <select
                                name="county"
                                value={formData.county}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Select county</option>
                                {COUNTIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ ...styles.field, flex: 1 }}>
                            <label style={styles.label}>Town</label>
                            <input
                                type="text"
                                name="town"
                                value={formData.town}
                                onChange={handleChange}
                                placeholder="e.g. Westlands"
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={loading ? styles.buttonDisabled : styles.button}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Link to Login */}
                <p style={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>
                        Sign in
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
        maxWidth: '440px',
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
    row: {
        display: 'flex',
        gap: '12px'
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
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box'
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