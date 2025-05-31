import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import car from "../assests/car.png";

const About = () => {
    return (
        <>
            <Header />

            <section className="container my-5">
                <motion.div
                    className="text-center mb-5"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="fw-bold text-primary display-4">About Rentro</h1>
                    <p className="lead text-muted mt-3">
                        Discover who we are and why we’re passionate about helping you find the perfect ride.
                    </p>
                </motion.div>

                <div className="row align-items-center mb-5">
                    <motion.div
                        className="col-md-6 mb-4 mb-md-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img
                            src={car}
                            alt="About Us"
                            className="img-fluid rounded shadow-lg"
                        />
                    </motion.div>

                    <motion.div
                        className="col-md-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div
                            style={{
                                background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
                                color: "#fff",
                                padding: "2.5rem",
                                borderRadius: "1rem",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h3 className="fw-bold mb-3">Driven by Trust, Powered by Innovation</h3>
                            <p className="mb-3">
                                At Rentro, we believe car rental should be simple, flexible, and trustworthy. With years
                                of experience and a customer-first approach, we’ve built a platform that connects people
                                with vehicles that suit their style, budget, and travel needs.
                            </p>
                            <p className="mb-4">
                                Our team works hard to ensure you enjoy a smooth experience from browsing to booking —
                                and beyond. Whether you're going on a weekend trip, moving to a new city, or just need a
                                temporary set of wheels, we’ve got you covered.
                            </p>
                            <Link
                                to="/contact"
                                className="btn btn-outline-light fw-semibold px-4 py-2 rounded-pill shadow-sm"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="p-5 text-center mt-5"
                    style={{
                        background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
                        color: "#fff",
                        borderRadius: "1rem",
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h4 className="fw-bold mb-3 fs-3">Our Mission</h4>
                    <p className="fs-5">
                        To empower every journey by making car rental accessible, reliable, and enjoyable for everyone.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </>
    );
};

export default About;
