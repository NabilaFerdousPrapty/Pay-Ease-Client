import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, pin) => {
        setLoading(true);
        try {
            const response = await axios.post('/auth/login', { email, pin });
            localStorage.setItem('access-token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access-token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
