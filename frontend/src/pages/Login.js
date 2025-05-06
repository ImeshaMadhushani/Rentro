import React, { useState } from "react";
import { Link } from "react-router-dom";
import car from "../assests/car.png";
import logo from "../assests/logo.png";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post(`${API_URL}/api/users/login`, { email, password })
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }
                    return response.data;
                });
            
            

            const data = response.data;

            if (response.status === 200) {
                alert("Login successful");
                navigate("/home"); 
            } else {
                setError(data.message || "Login failed");
            }
            e.target.reset();
        } catch (err) {
            let errorMessage = "An error occurred. Please try again.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message; 
            } else if (err.request) {
                errorMessage = "No response from server. Check your connection.";
            } else {
                errorMessage = err.message;
            }
            setError(errorMessage);
            console.error("Login error:", err);

        }
    };

    
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary px-3 py-4">
            <style>
                {`
                :root {
                    --animated-gradient: linear-gradient(270deg, #007bff, #6610f2);
                }

                .small-placeholder::placeholder {
                    font-size: 0.8rem;
                }

                .form-control:focus {
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
                    transition: all 0.3s ease-in-out;
                }

                .animated-gradient-bg {
                    background: var(--animated-gradient);
                    background-size: 400% 400%;
                    animation: bgMove 10s ease infinite;
                    color: white;
                    transition: background 0.5s ease-in-out;
                }

                @keyframes bgMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .gradient-btn {
                    background: var(--animated-gradient);
                    background-size: 400% 400%;
                    animation: bgMove 10s ease infinite;
                    color: #fff;
                    border: none;
                    transition: background-position 1s ease;
                }

                .gradient-btn:hover {
                    background-position: right center;
                    box-shadow: 0 0 15px rgba(102, 16, 242, 0.4);
                }
                `}
            </style>

            <motion.div
                className="d-flex flex-column flex-lg-row bg-white rounded-4 shadow-lg overflow-hidden w-100"
                style={{ maxWidth: "960px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Left Section - Login Form */}
                <div className="col-12 col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
                    <div>
                        <div className="text-center mb-4">
                            <motion.img
                                src={logo}
                                alt="Logo"
                                style={{ height: "80px" }}
                                whileHover={{ scale: 1.1 }}
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <h2 className="fw-bold text-dark mb-2 fs-4 fs-md-3">Welcome Back</h2>
                            <p className="text-muted small mb-0">
                                Don’t have an account?{" "}
                                <Link to="/" className="text-decoration-none text-primary fw-semibold">
                                    Sign up here
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-muted small fw-semibold">
                                    Email Address
                                </label>
                                <motion.input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="form-control form-control-sm form-control-lg border-light shadow-sm small-placeholder"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted small fw-semibold">
                                    Password
                                </label>
                                <motion.input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="form-control form-control-sm form-control-lg border-light shadow-sm small-placeholder"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger small py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                className="btn gradient-btn w-100 py-2 fw-bold shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Login
                            </motion.button>
                        </form>
                    </div>

                    <div className="text-center mt-4 small text-muted">
                        &copy; {new Date().getFullYear()} Rentro. All rights reserved.
                    </div>
                </div>

                {/* Right Section - Animated Car and Background */}
                <motion.div
                    className="col-12 col-lg-6 d-flex align-items-center justify-content-center text-white p-4 animated-gradient-bg"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 18 }}
                >
                    <div className="text-center">
                        <motion.img
                            src={car}
                            alt="Car"
                            className="img-fluid mb-3"
                            style={{ maxWidth: "85%" }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <h3 className="fw-bold fs-5 mb-2">Welcome Back!</h3>
                        <p className="text-light small mb-0">
                            Login to continue your journey with us.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
