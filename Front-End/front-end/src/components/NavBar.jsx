import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NavBar.css';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage
        const loggedInUser = localStorage.getItem('username');
        if (loggedInUser) {
            setUsername(loggedInUser);
        } else {
            // If no username in localStorage, redirect to login page
            navigate('/');
        }
    }, [navigate]); // Re-run the effect if navigate changes

    const handleLogout = async () => {
        try {
            // Remove JWT token and username from localStorage
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('username');

            // Reset the username state
            setUsername('');

            // Redirect to the login page after logout
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Function to navigate to home page
    const handleHome = () => {
        navigate('/home');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">Manage Services</div>
            <div className="navbar-right">
                {username ? (
                    <>
                        <span className="user-name">{username}</span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <span className="user-name">Guest</span>
                )}
                <button className="home-button" onClick={handleHome}>Home</button>
            </div>
        </nav>
    );
};

export default Navbar;
