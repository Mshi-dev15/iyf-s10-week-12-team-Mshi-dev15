// frontend/src/components/ProtectedRoute.jsx
// F5 Task — Blocks access to pages that require login
// If user is not logged in, redirects to /login

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Save where the user was trying to go
        // After login they'll be redirected back there
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}