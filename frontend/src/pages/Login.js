import React from "react";
import { Link } from "react-router-dom";
import car from "../assests/car.png";
import logo from "../assests/logo.png";
import { motion } from "framer-motion";

const Login = () => {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-body-tertiary px-3 py-4">
            <style>
                {`
                .small-placeholder::placeholder {
                    font-size: 0.8rem;
                }
                `}
            </style>

            {/* 🔸 LOGO OUTSIDE */}
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ height: "100px" }} />
            </div>

            {/* 🔸 MAIN LOGIN CONTAINER */}
            <motion.div
                className="d-flex flex-column flex-lg-row bg-white rounded-4 shadow-lg overflow-hidden w-100"
                style={{ maxWidth: "960px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Left Section - Login Form */}
                <div className="col-12 col-lg-6 p-4 p-md-5">
                    <div className="mb-4">
                        <h2 className="fw-bold text-dark mb-2 fs-4 fs-md-3">Welcome Back</h2>
                        <p className="text-muted small mb-0">
                            Don't have an account?{" "}
                            <Link to="/" className="text-decoration-none text-primary fw-semibold">
                                Sign up here
                            </Link>
                        </p>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-muted small fw-semibold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email address"
                                className="form-control form-control-sm form-control-lg border-light shadow-sm small-placeholder"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-muted small fw-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="form-control form-control-sm form-control-lg border-light shadow-sm small-placeholder"
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Login
                        </motion.button>
                    </form>
                </div>

                {/* Right Section - Visual Side */}
                <motion.div
                    className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-primary text-white p-4"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 18 }}
                >
                    <div className="text-center">
                        <img
                            src={car}
                            alt="Car"
                            className="img-fluid mb-3"
                            style={{ maxWidth: "85%" }}
                        />
                        <h3 className="fw-bold fs-5 mb-2">Welcome Back!</h3>
                        <p className="text-light small mb-0">
                            Login to continue your journey with us.
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* 🔸 COPYRIGHT OUTSIDE */}
            <div className="text-center mt-4 small text-muted">
                &copy; {new Date().getFullYear()} Rentro. All rights reserved.
            </div>
        </div>
    );
};

export default Login;
