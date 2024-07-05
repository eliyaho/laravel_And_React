import React, { useState } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import axios from "axios";
import "./styles.css"; // External style file

/**
 * Component for user login.
 */
function Login() {
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input
    const [redirect, setRedirect] = useState(false); // State to handle redirection
    const [redirectAdmin, setRedirectAdmin] = useState(false); 
    const [error, setError] = useState(""); // State for login error

    /**
     * Function to handle form submission for user login.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/mortgages/login", {
                username,
                password,
            });

            if (response.data.success) {
                return <Navigate to="/admin" />;
            } else {
                setError("Invalid username or password."); // Set error message
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Error logging in. Please try again later.");
        }
    };

    /**
     * Function to navigate to /MortgageTable without login.
     */
    const handleContinueWithoutLogin = () => {
        setRedirect(true); // Set redirect state to true
    };

    if (redirect) {
        return <Navigate to="/MortgageTable" />; // Redirect to /MortgageTable
    }
     const LoginA = () => {
        setRedirectAdmin(true); // Set redirect state to true
    };

    if (redirectAdmin) {
        return <Navigate to="/admin" />; // Redirect to /MortgageTable
    }
    /**
     * JSX rendering the Login component.
     */
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
                        // onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={LoginA}>Login</button>
            </form>
            <button className="continue-btn" onClick={handleContinueWithoutLogin}>
                Continue without login
            </button>
        </div>
    );
}

export default Login;
