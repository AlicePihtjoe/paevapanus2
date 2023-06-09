import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/authenticated')
            .then(res => res.json())
            .then(data => {
                setIsAuthenticated(data.authenticated);
                setUser(data.user); // Update the setUser state with the user data
                setIsLoading(false);
            });
    }, []);

    const value = {
        user,
        isAuthenticated,
        isLoading,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}




// import React, { createContext, useContext, useState, useEffect } from 'react';
//
// const AuthContext = createContext();
//
// export function useAuth() {
//     return useContext(AuthContext);
// }
//
// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         fetch('/api/authenticated')
//             .then(res => res.json())
//             .then(data => {
//                 setIsAuthenticated(data.authenticated);
//                 setUser(data.user); // Update the setUser state with the user data
//                 setIsLoading(false);
//             });
//     }, []);
//
//     const value = {
//         user,
//         isAuthenticated,
//         isLoading,
//         setIsAuthenticated
//     };
//
//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// }