import React, { useState, useEffect } from "react";

const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds;

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const storedData = localStorage.getItem("authData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Check if expiration is set and handle accordingly
            if (parsedData.expiration) {
                const expirationDuration = parsedData.expiration === "1 Day" ? ONE_DAY : NINETY_DAYS;
                if (Date.now() > parsedData.savedAt + expirationDuration) {
                    // Clear expired data
                    localStorage.removeItem("authData");
                    return { isAuthenticated: false, token: null, user: null };
                }
            }
            return parsedData;
        }
        return { isAuthenticated: false, token: null, user: null };
    });

    const [rememberMe, setRememberMe] = useState(false);

    // Save authData to localStorage whenever it changes
    useEffect(() => {
        if (authData.isAuthenticated) {
            const expiration = rememberMe ? "90 Days" : "1 Day";
            localStorage.setItem(
                "authData",
                JSON.stringify({
                    ...authData,
                    expiration,
                    savedAt: Date.now(), // Store the time of saving for expiration check
                })
            );
        } else {
            localStorage.removeItem("authData");
        }
    }, [authData, rememberMe]);

    const login = (token, user, remember) => {
        setRememberMe(remember); // Track Remember Me checkbox
        setAuthData({
            isAuthenticated: true,
            token,
            user,
        });
    };

    const logout = () => {
        setAuthData({
            isAuthenticated: false,
            token: null,
            user: null,
        });
        localStorage.removeItem("authData");
    };

    // Expose auth management functions globally via localStorage
    window.auth = {
        login,
        logout,
        getAuthData: () => JSON.parse(localStorage.getItem("authData")),
    };

    return <>{children}</>;
};
