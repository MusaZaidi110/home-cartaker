// AuthRoute.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/common/AuthProvider';

export const AuthRoute = ({ children }) => {
    const { isAuthenticated, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            switch (role) {
                case 'user':
                    navigate('/user/dashboard');
                    break;
                case 'vendor':
                    navigate('/vendor/dashboard');
                    break;
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [isAuthenticated, navigate, role]);

    return !isAuthenticated ? children : null;
};