import React, { useState } from 'react';
import '../style/LandingPage.css';

const HomePage = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        // Calculate rotation values based on mouse position
        const xRotation = ((clientY / innerHeight) - 0.5) * 30; // 30° max rotation up/down
        const yRotation = ((clientX / innerWidth) - 0.5) * -30; // 30° max rotation left/right

        setRotation({ x: xRotation, y: yRotation });
    };

    return (
        <div
            className="homepage-container"
            onMouseMove={handleMouseMove} // Track mouse movement
        >
            <div
                className="homepage-card"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                <h1>Welcome to SecureSpace</h1>
                <p>
                    Discover a seamless and secure platform for managing your data with ease.
                </p>
                <div className="features">
                    <div className="feature-item">
                        <span>🔒</span>
                        <p>Top-notch security</p>
                    </div>
                    <div className="feature-item">
                        <span>⚡</span>
                        <p>Blazing-fast performance</p>
                    </div>
                    <div className="feature-item">
                        <span>🌍</span>
                        <p>Access anywhere</p>
                    </div>
                </div>
                <div className="button-group">
                    <button
                        className="action-button login-button"
                        onClick={() => {
                            window.location.href = '/login';
                        }}
                    >
                        Log In
                    </button>
                    <button
                        className="action-button register-button"
                        onClick={() => {
                            window.location.href = '/register';
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
