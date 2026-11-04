import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: 1,
        name: 'Xiaoying Riley',
        email: 'admin@portal.test',
        role: 'Admin',
        title: 'Product Designer & Developer',
        bio: 'Building modern, responsive admin portals and dashboards for developer teams.',
        avatar: '/assets/images/users/user-1.jpg',
        location: 'Bristol, UK',
        website: 'https://themes.3rdwavemedia.com',
        two_factor_enabled: false,
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/me');
            if (res.data.user) {
                setUser(res.data.user);
                setIsAuthenticated(res.data.authenticated);
            }
        } catch (err) {
            console.error('Failed to load user', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email, password, remember = false) => {
        const res = await api.post('/login', { email, password, remember });
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res.data;
    };

    const signup = async (name, email, password) => {
        const res = await api.post('/signup', { name, email, password });
        setUser(res.data.user);
        setIsAuthenticated(true);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            // ignore
        }
        setIsAuthenticated(false);
    };

    const updateProfile = async (formData) => {
        const res = await api.post('/profile', formData);
        setUser(res.data.user);
        return res.data;
    };

    const changePassword = async (current_password, new_password) => {
        const res = await api.post('/change-password', { current_password, new_password });
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout, updateProfile, changePassword, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

