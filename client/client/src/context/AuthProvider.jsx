import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        userId: null,
    });

    useEffect(() => {
        // Initialize authState from localStorage on mount
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            setAuthState({ token, userId });
        }
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        setAuthState({ token: data.token, userId: data.userId });
    };

    const logout = () => {
        localStorage.clear();
        setAuthState({ token: null, userId: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
