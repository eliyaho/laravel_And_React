import React, { useState } from "react";
import "./styles.css"; // External style file

/**
 * Component for user login.
 */
function Login() {
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input

    /**
     * Function to handle form submission for user login.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement login logic here
    };

    /**
     * JSX rendering the Login component.
     */
    return (
        <div className="container">
            <h2>Login</h2>
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
        </div>
    );
}

export default Login;
