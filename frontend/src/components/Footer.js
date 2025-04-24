import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaCar, FaMapMarkerAlt, FaPhone, FaEnvelope,
    FaFacebook, FaTwitter, FaInstagram, FaLinkedin
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white pt-5 pb-4">
            <Container>
                {/* Hero Section */}
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <FaCar className="text-primary me-2" size={32} />
                            <span className="fs-4 fw-bold text-white">RENTRO</span>
                        </div>
                        <h2 className="fw-semibold mb-3" style={{ fontSize: '1.75rem' }}>Find the perfect car for any trip</h2>
                        <p className="text-light mx-auto opacity-75" style={{ maxWidth: '600px' }}>
                            Luxury rides, budget-friendly cars, or spacious SUVs — Rent confidently and drive in style.
                        </p>
                    </Col>
                </Row>

                {/* Main Content */}
                <Row className="g-4 mb-4">
                    {/* Useful Links */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase fw-bold mb-4" style={{ letterSpacing: '1px' }}>Quick Links</h5>
                        <ul className="list-unstyled">
                            {['About us', 'Contact us', 'Vehicles', 'Terms & Conditions', 'Privacy Policy'].map((link, idx) => (
                                <li key={idx} className="mb-2">
                                    <a
                                        href={`/${link.toLowerCase().replace(/ & | /g, '-')}`}
                                        className="text-decoration-none text-white-50 hover-primary"
                                        style={{ transition: 'all 0.3s ease' }}
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Vehicle Types */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase fw-bold mb-4" style={{ letterSpacing: '1px' }}>Our Fleet</h5>
                        <ul className="list-unstyled">
                            {['Luxury Cars', 'SUVs', 'Economy Cars', 'Vans', 'Electric Vehicles'].map((type, idx) => (
                                <li key={idx} className="mb-2">
                                    <button
                                        type="button"
                                        className="text-decoration-none text-white-50 hover-primary bg-transparent border-0 p-0"
                                        style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                        onClick={() => alert('Navigation not implemented')}
                                    >
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase fw-bold mb-4" style={{ letterSpacing: '1px' }}>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start">
                                <FaMapMarkerAlt className="text-primary mt-1 me-3" />
                                <div>
                                    <p className="mb-0 text-white-50">No. 25, Galle Road,</p>
                                    <p className="mb-0 text-white-50">Colombo 03, Sri Lanka</p>
                                </div>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <FaPhone className="text-primary me-3" />
                                <a href="tel:+94112345678" className="text-white-50 text-decoration-none hover-primary">+94 112 345 678</a>
                            </li>
                            <li className="d-flex align-items-center">
                                <FaEnvelope className="text-primary me-3" />
                                <a href="mailto:info@rentro.com" className="text-white-50 text-decoration-none hover-primary">info@rentro.com</a>
                            </li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={3} md={6}>
                        <h5 className="text-uppercase fw-bold mb-4" style={{ letterSpacing: '1px' }}>Newsletter</h5>
                        <p className="text-white-50 mb-3">Subscribe to receive updates and special offers.</p>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control bg-transparent text-white border-secondary"
                                placeholder="Your Email"
                            />
                        </div>
                        <button className="btn btn-primary w-100">Subscribe</button>
                    </Col>
                </Row>

                {/* Divider */}
                <hr className="my-4 bg-secondary opacity-25" />

                {/* Social and Copyright */}
                <Row className="align-items-center">
                    <Col md={6} className="mb-3 mb-md-0">
                        <div className="d-flex gap-3">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white-50 fs-5 hover-primary"
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white-50 fs-5 hover-primary"
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white-50 fs-5 hover-primary"
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white-50 fs-5 hover-primary"
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p className="text-white-50 mb-0 small">
                            &copy; {new Date().getFullYear()} Rentro. All rights reserved.
                        </p>
                        {/* <p className="text-white-50 small mb-0">
                            Designed with ❤️ for car enthusiasts
                        </p> */}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;