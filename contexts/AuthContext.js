import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch authentication status when the component is mounted
        fetch('/api/authenticated')
            .then(res => res.json())
            .then(data => {
                setIsAuthenticated(data.authenticated);
                setIsLoading(false); // Update loading state when the request is complete
            });
    }, []);

    const value = {
        isAuthenticated,
        isLoading, // Export loading state
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
