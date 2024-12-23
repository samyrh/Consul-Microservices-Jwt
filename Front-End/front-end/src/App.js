import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import UserTable from './components/TableClients';
import ProductTable from './components/TableProducts';
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from './components/PrivateRoute';
import ClientProduct from "./components/ClientProduct"; // Import the PrivateRoute component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Landing Page Route */}
                <Route path="/" element={<LandingPage />} />

                {/* Login and Register Routes */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />

                {/* Protected Routes (requires login) */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />

                    {/* Client Table Route */}
                    <Route
                        path="/api/clients"
                        element={
                            <>
                                <Navbar />
                                <UserTable />
                            </>
                        }
                    />

                    {/* Product Table Route */}
                    <Route
                        path="/api/products"
                        element={
                            <>
                                <Navbar />
                                <ProductTable />
                            </>
                        }
                    />

                    {/* Product Table Route */}
                    <Route
                        path="/api/sales"
                        element={
                            <>
                                <Navbar />
                                <ClientProduct />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
