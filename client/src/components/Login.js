import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [redirectAdmin, setRedirectAdmin] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/mortgages/login", {
                username,
                password,
            });

            if (response.data.success) {
                setRedirectAdmin(true);
            } else {
                setError("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Error logging in. Please try again later.");
        }
    };

    const handleContinueWithoutLogin = () => {
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/MortgageTable" />;
    }

    if (redirectAdmin) {
        return <Navigate to="/admin" />;
    }

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <button className="continue-btn" onClick={handleContinueWithoutLogin}>
                Continue without login
            </button>
        </div>
    );
}

export default Login;