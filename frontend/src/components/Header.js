import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { FiLogOut } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rewardPoints, setRewardPoints] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const points = localStorage.getItem('rewardPoints') || 0;
        setRewardPoints(parseInt(points));
    }, []);

    const navLinks = [
        { to: "/home", text: "Home" },
        { to: "/vehicles", text: "Vehicles" },
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        {
            to: "/rewards",
            text: (
                <span className="d-flex align-items-center">
                    <FaCoins className="me-1 text-warning" />
                    <span className="badge bg-primary rounded-pill">
                        {rewardPoints}
                    </span>
                </span>
            )
        },
        {
            to: "/profile",
            text: (
                <span className="d-flex align-items-center">
                    <FiUser className="me-1" />
                    <span className="d-none d-md-inline">Profile</span>
                </span>
            )
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <header className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-0">
            <div className="container-fluid px-3 px-md-4">
                <Link to="/home" className="navbar-brand d-flex align-items-center py-2">
                    <img src={logo} alt="Rentro Logo" height={48} className="d-md-none" />
                    <img src={logo} alt="Rentro Logo" height={64} className="d-none d-md-block" />
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    aria-controls="rentroNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse${isOpen ? " show" : ""}`} id="rentroNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        {navLinks.map(({ to, text }) => (
                            <li className="nav-item px-1 px-md-2" key={to}>
                                <Link
                                    to={to}
                                    className="nav-link nav-link-hover d-flex align-items-center py-3 py-md-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {text}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item ps-1 ps-md-2">
                            <button
                                className="btn btn-outline-danger d-flex align-items-center py-2"
                                onClick={handleLogout}
                            >
                                <FiLogOut className="me-1 me-md-2" />
                                <span className="d-none d-md-inline">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`
                .nav-link-hover {
                    position: relative;
                    transition: color 0.3s;
                    white-space: nowrap;
                }
                .nav-link-hover:hover {
                    color: #0d6efd;
                }
                .nav-link-hover::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 2px;
                    width: 0;
                    background: #0d6efd;
                    transition: width 0.3s;
                }
                .nav-link-hover:hover::after {
                    width: 100%;
                }
                .navbar-toggler:focus {
                    box-shadow: none;
                }
                @media (max-width: 991.98px) {
                    .navbar-collapse {
                        padding: 1rem;
                        background: white;
                        border-radius: 0.5rem;
                        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
                    }
                    .nav-item {
                        border-bottom: 1px solid #f0f0f0;
                    }
                    .nav-item:last-child {
                        border-bottom: none;
                    }
                    .btn-outline-danger {
                        width: 100%;
                        text-align: left;
                        padding: 0.5rem 1rem;
                        border: none;
                        color: #dc3545;
                        background-color: transparent;
                    }
                    .btn-outline-danger:hover {
                        background-color: rgba(220, 53, 69, 0.1);
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;