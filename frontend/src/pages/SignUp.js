import React, { useState } from "react";
import { Link } from "react-router-dom";
import car from "../assests/car.png";
import logo from "../assests/logo.png";
import { motion } from "framer-motion";
import axios from "axios";


const SignUp = () => {

     const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", formData);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/signup`, formData);
            setMessage("✅ " + res.data);
            setFormData({ fullName: "", email: "", phone: "", password: "" });
            e.target.reset();
        } catch (error) {
            if (error.response) {
                setMessage("❌ " + error.response.data);
            } else {
                setMessage("❌ Error: Could not connect to server.");
            }
        }
    };

    
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary px-3 py-4 flex-column">
            <style>
                {`
                .small-placeholder::placeholder {
                    font-size: 0.8rem;
                }

                .form-control:focus {
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
                    transition: all 0.3s ease-in-out;
                }

                /* 🔄 Shared Moving Gradient Background */
                .moving-bg {
                    background: linear-gradient(270deg, #007bff, #6610f2);
                    background-size: 400% 400%;
                    animation: bgMove 10s ease infinite;
                }

                @keyframes bgMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* 🔘 Button Matches Moving BG */
                .moving-btn {
                    background: linear-gradient(270deg, #007bff, #6610f2);
                    background-size: 400% 400%;
                    animation: bgMove 10s ease infinite;
                    color: #fff;
                    border: none;
                    transition: box-shadow 0.3s ease;
                }

                .moving-btn:hover {
                    box-shadow: 0 0 12px rgba(102, 16, 242, 0.4);
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
                {/* Left Section */}
                <div className="col-12 col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-between">
                    <div>
                        <div className="text-center mb-4">
                            <motion.img
                                src={logo}
                                alt="Logo"
                                style={{ height: "80px" }}
                                whileHover={{ scale: 1.1 }}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                //onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <h2 className="fw-bold text-dark mb-2 fs-4 fs-md-3">Create Your Account</h2>
                            <p className="text-muted small mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="text-decoration-none text-primary fw-semibold">
                                    Log in here
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {["fullName", "email", "phone", "password"].map((fieldId) => {
                                const label = fieldId.charAt(0).toUpperCase() + fieldId.slice(1);
                                const id = label === "fullName" ? "fullName" : label.toLowerCase().split(" ")[0];
                                const type = id === "email" ? "email" : id === "password" ? "password" : id === "phone" ? "tel" : "text";
                                return (
                                    <div className="mb-3" key={id}>
                                        <label htmlFor={id} className="form-label text-muted small fw-semibold">
                                            {label}
                                        </label>
                                        <motion.input
                                            type={type}
                                            id={id}
                                            value={formData[id]}
                                            onChange={handleChange}
                                            placeholder={`Enter your ${label.toLowerCase()}`}
                                            className="form-control form-control-sm form-control-lg border-light shadow-sm small-placeholder"
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </div>
                                );
                            })}

                            <motion.button
                                type="submit"
                                className="btn moving-btn w-100 py-2 fw-bold shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Sign Up
                            </motion.button>
                        </form>

                        {message && (
                            <div className="alert mt-3" role="alert">
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-4 small text-muted">
                        &copy; {new Date().getFullYear()} Rentro. All rights reserved.
                    </div>
                </div>

                {/* Right Section */}
                <motion.div
                    className="col-12 col-lg-6 d-flex align-items-center justify-content-center text-white p-4 moving-bg"
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
                        <h3 className="fw-bold fs-5 mb-2">Welcome to Our Platform</h3>
                        <p className="text-light small mb-0">
                            Join us and enjoy a smooth, reliable, and seamless experience.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SignUp;
