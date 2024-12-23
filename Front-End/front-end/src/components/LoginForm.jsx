import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/LoginForm.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);  // Track the shake state of the card
    const [usernameError, setUsernameError] = useState(false); // Track input error state
    const [passwordError, setPasswordError] = useState(false); // Track input error state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setUsernameError(false);
        setPasswordError(false);

        try {
            const response = await fetch('http://localhost:9999/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.jwt;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('username', username);  // Store the username

                // Redirect to the /home page
                navigate('/home'); // Use navigate() instead of window.location.href
            } else {
                setError('Invalid credentials');
                setShake(true); // Trigger the shake animation on error
                setUsernameError(true); // Set username input to error state
                setPasswordError(true); // Set password input to error state

                setTimeout(() => {
                    setShake(false);
                    setUsernameError(false); // Reset username error state
                    setPasswordError(false); // Reset password error state
                }, 600); // Reset after the shake animation completes
            }
        } catch (error) {
            setError('Something went wrong');
            setShake(true); // Trigger the shake animation on error
            setUsernameError(true); // Set username input to error state
            setPasswordError(true); // Set password input to error state

            setTimeout(() => {
                setShake(false);
                setUsernameError(false); // Reset username error state
                setPasswordError(false); // Reset password error state
            }, 600); // Reset after the shake animation completes
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-card ${shake ? 'shake' : ''}`}>
                <h1>Log In</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            className={usernameError ? 'error' : ''}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className={passwordError ? 'error' : ''}
                        />
                    </div>
                    <button type="submit" className="submit-button">Log In</button>
                </form>
                <Link to="/" className="back-to-home">Back to Home</Link>
            </div>
        </div>
    );
};

export default Login;
