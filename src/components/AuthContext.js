import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [jwtToken, setJwtToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ jwtToken, setJwtToken, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
