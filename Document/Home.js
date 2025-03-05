import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to Crime Track</h1>
            <p>Your trusted platform for reporting crimes and staying informed.</p>
            <div className="buttons">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    );
};

export default Home;
