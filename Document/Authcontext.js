import React, { createContext, useState, useEffect } from "react";
import { loginUser, getUserProfile, logoutUser } from "../services/api";

// Create AuthContext
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Function to handle login
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            localStorage.setItem("token", data.token);
        } catch (error) {
            throw new Error(error.response?.data?.error || "Login failed");
        }
    };

    // Function to handle logout
    const logout = () => {
        logoutUser();
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
