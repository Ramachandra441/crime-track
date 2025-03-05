import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import ReportCrime from "./components/ReportCrime";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/report-crime" element={user ? <ReportCrime /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default App;
