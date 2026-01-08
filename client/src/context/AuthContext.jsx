import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Auth init error:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, [token]);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token: newToken, ...userData } = response.data;

        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);

        return userData;
    };

    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        const { token: newToken, ...userData } = response.data;

        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);

        return userData;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
