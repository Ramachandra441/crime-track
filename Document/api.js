import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Login function
export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

// Get logged-in user profile
export const getUserProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

// Logout function (optional)
export const logoutUser = () => {
    localStorage.removeItem("token");
};
