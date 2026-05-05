// frontend/src/pages/Register.jsx
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
        name: '', email: '', password: '', role: 'user', county: '', town: ''
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
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-8">
            <div className="fixed top-4 left-4">
    <Link to="/" className="text-gray-500 hover:text-green-600 text-sm flex items-center gap-1">
        ← Back to Home
    </Link>
</div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-green-600 text-center mb-1">🇰🇪 BridgeKE</h1>
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">Create your account</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Join thousands of Kenyan youth finding opportunities</p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="John Kamau" required
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="you@example.com" required
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            placeholder="••••••••" required
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">I am a...</label>
                        <select name="role" value={formData.role} onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                            <option value="user">Youth seeking opportunities</option>
                            <option value="organization">Organization posting opportunities</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm font-medium text-gray-700">County</label>
                            <select name="county" value={formData.county} onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                                <option value="">Select county</option>
                                {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm font-medium text-gray-700">Town</label>
                            <input type="text" name="town" value={formData.town} onChange={handleChange}
                                placeholder="e.g. Westlands"
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-semibold text-sm mt-2 transition ${loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'}`}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}