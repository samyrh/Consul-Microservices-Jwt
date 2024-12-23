import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../style/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const goToClients = () => {
        navigate('/api/clients');
    };

    const goToProducts = () => {
        navigate('/api/products');
    };
    const goToSales = () => {
        navigate('/api/sales');
    };

    return (
        <div className="home-container">
            {/* Flying bubbles */}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>

            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to the Management System
            </motion.h1>

            <motion.p
                className="mini-description"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                This system helps you efficiently manage and organize your clients and products. Choose a section to get started and take control of your business operations!
            </motion.p>

            <div className="button-container">
                <motion.button
                    onClick={goToClients}
                    className="navigate-button"
                    whileHover={{scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'}}
                    whileTap={{scale: 0.95}}
                    transition={{duration: 0.3}}
                >
                    Go to Clients
                </motion.button>

                <motion.button
                    onClick={goToProducts}
                    className="navigate-button"
                    whileHover={{scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'}}
                    whileTap={{scale: 0.95}}
                    transition={{duration: 0.3}}
                >
                    Go to Products
                </motion.button>

                <motion.button
                    onClick={goToSales}
                    className="navigate-button"
                    whileHover={{scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'}}
                    whileTap={{scale: 0.95}}
                    transition={{duration: 0.3}}
                >
                    Go to Sales
                </motion.button>
            </div>
        </div>
    );
};

export default HomePage;
