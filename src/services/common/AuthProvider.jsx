import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react";

// Constants
const ONE_DAY = 24 * 60 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

// Create context
const AuthContext = createContext();

// Memoized default state
    const getDefaultAuthState = () => ({
        isAuthenticated: false,
        token: null,
        role: null,
        userData: null
    });

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        try {
            const storedData = localStorage.getItem("authData");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                
                // Handle expiration
                if (parsedData.expiration && parsedData.savedAt) {
                    const expirationDuration = parsedData.expiration === "1 Day" ? ONE_DAY : 
                                           parsedData.expiration === "30 Days" ? THIRTY_DAYS : NINETY_DAYS;
                    
                    if (Date.now() > parsedData.savedAt + expirationDuration) {
                        localStorage.removeItem("authData");
                        return getDefaultAuthState();
                    }
                }
                return parsedData;
            }
        } catch (error) {
            console.error("Failed to parse auth data", error);
            localStorage.removeItem("authData");
        }
        return getDefaultAuthState();
    });

    // Save to localStorage only when necessary
    useEffect(() => {
        if (authData.isAuthenticated) {
            localStorage.setItem(
                "authData",
                JSON.stringify({
                    ...authData,
                    expiration: "30 Days",
                    savedAt: Date.now(),
                })
            );
        } else {
            localStorage.removeItem("authData");
        }
    }, [authData]);

    // Memoized login function
    const login = useCallback((token, role, userData) => {
        setAuthData({
            isAuthenticated: true,
            token,
            role,
            userData
        });
    }, []);

    // Memoized logout function
    const logout = useCallback(() => {
        setAuthData(getDefaultAuthState());
        localStorage.removeItem("authData");
    }, []);

    // Memoized context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        ...authData,
        login,
        logout
    }), [authData, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};