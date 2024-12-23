import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/RegisterForm.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [progress, setProgress] = useState(0); // Progress state (for filling the progress bar)
    const [inputErrors, setInputErrors] = useState({
        name: false,
        username: false,
        phone: false,
        email: false,
        password: false,
    });
    const navigate = useNavigate(); // Hook to handle navigation after successful registration

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start the loading process

        // Reset input errors
        setInputErrors({
            name: false,
            username: false,
            phone: false,
            email: false,
            password: false,
        });

        // Simulate the progress bar filling up over time
        let progressInterval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress < 100) return oldProgress + 10;
                clearInterval(progressInterval);
                return 100;
            });
        }, 200);

        try {
            const response = await fetch('http://localhost:9999/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, phone, email, password }),
            });

            if (response.ok) {
                setTimeout(() => {
                    setProgress(100); // Set the progress to 100% when done
                    navigate('/login'); // Redirect to login after successful registration
                }, 2000); // After the process completes, navigate to the login screen
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message || 'Registration failed');
                setProgress(0); // Reset the progress if an error occurs
            }
        } catch (error) {
            setError('Something went wrong.');
            setProgress(0); // Reset the progress if an error occurs
        }
    };

    return (
        <div className={`auth-container ${isLoading ? 'loading' : ''}`}>
            <div className={`auth-card ${isLoading ? 'fading' : ''}`}>
                <h1>Register</h1>
                {error && <p className="error-message">{error}</p>}

                {/* Display progress bar while loading */}
                {isLoading ? (
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your name"
                                className={inputErrors.name ? 'error-input shake' : ''}
                            />
                        </div>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
                                className={inputErrors.username ? 'error-input shake' : ''}
                            />
                        </div>
                        <div className="input-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="Enter your phone number"
                                className={inputErrors.phone ? 'error-input shake' : ''}
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className={inputErrors.email ? 'error-input shake' : ''}
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
                                className={inputErrors.password ? 'error-input shake' : ''}
                            />
                        </div>
                        <button type="submit" className="submit-button">Register</button>
                    </form>
                )}
                <Link to="/" className="back-to-home">Back to Home</Link>
            </div>
        </div>
    );
};

export default Register;
