import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiNavigation } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

const FactsInNumbers = () => {
    const facts = [
        {
            number: "540+",
            label: "Cars",
            icon: <FaCar className="fact-icon" />,
            color: "text-primary"
        },
        {
            number: "20k+",
            label: "Customers",
            icon: <FiUsers className="fact-icon" />,
            color: "text-purple-500"
        },
        {
            number: "25+",
            label: "Years",
            icon: <FiCalendar className="fact-icon" />,
            color: "text-success"
        },
        {
            number: "20m+",
            label: "Miles",
            icon: <FiNavigation className="fact-icon" />,
            color: "text-warning"
        }
    ];

    return (
        <div className="py-5 px-3 bg-light">
            <style jsx>{`
                .fact-item {
                    position: relative;
                    padding: 2rem 1.5rem;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .fact-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
                }

                .fact-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 0;
                    background: linear-gradient(to bottom, #0d6efd, #8b5cf6);
                    transition: height 0.4s ease;
                }

                .fact-item:hover::before {
                    height: 100%;
                }

                .fact-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    opacity: 0.9;
                }

                .section-title::after {
                    content: '';
                    display: block;
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(to right, #0d6efd, #8b5cf6);
                    margin: 1rem auto;
                    border-radius: 3px;
                }
            `}</style>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-5"
                >
                    <h2 className="display-5 fw-bold text-dark mb-3 section-title">
                        Facts In Numbers
                    </h2>
                    <p className="lead text-secondary mx-auto" style={{ maxWidth: '700px' }}>
                        Trusted by drivers for generations. Our expert team services hundreds of vehicles annually,
                        combining cutting-edge technology with decades of hands-on experience. We've proudly maintained
                        vehicles across millions of miles of safe driving.
                    </p>
                </motion.div>

                <div className="row gy-4">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={index}
                            className="col-12 col-md-6 col-lg-3"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="fact-item h-100 d-flex flex-column align-items-center text-center">
                                <div className={fact.color}>
                                    {fact.icon}
                                </div>
                                <motion.h3
                                    className="display-6 fw-bold text-dark mb-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {fact.number}
                                </motion.h3>
                                <p className="fs-5 fw-medium text-secondary">{fact.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FactsInNumbers;
