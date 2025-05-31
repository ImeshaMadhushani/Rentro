import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Contact = () => {
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
                    <h1 className="fw-bold text-primary display-4">Contact Us</h1>
                    <p className="lead text-muted mt-3">
                        We'd love to hear from you! Reach out to us with any questions, feedback, or support needs.
                    </p>
                </motion.div>

                <motion.div
                    className="row justify-content-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="col-md-8">
                        <div
                            className="p-4 rounded shadow-lg"
                            style={{
                                background: "linear-gradient(135deg, #0d6efd, #0b5ed7)",
                                color: "#fff"
                            }}
                        >
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Type your message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-light fw-semibold px-4 py-2 rounded-pill"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="text-center mt-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                   <p className="text-muted mt-4 fs-5">
    Or email us directly at{" "}
    <a
        href="mailto:info@rentro.com"
        className="text-decoration-none text-primary fw-semibold"
    >
        info@rentro.com
    </a>
</p>


                </motion.div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
