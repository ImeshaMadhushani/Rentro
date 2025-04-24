import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { FiLogOut } from "react-icons/fi"; // Using Feather icons from react-icons

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { to: "/home", text: "Home" },
        { to: "/vehicles", text: "Vehicles" },
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        { to: "/rewards", text: "Reward" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <header className="navbar navbar-expand-md bg-white shadow-sm sticky-top py-0">
            <div className="container">
                {/* logo */}
                <Link to="/home" className="navbar-brand d-flex align-items-center py-2">
                    <img src={logo} alt="Rentro Logo" height={64} />
                </Link>

                {/* hamburger */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#rentroNav"
                    aria-controls="rentroNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* links */}
                <div
                    className={`collapse navbar-collapse${isOpen ? " show" : ""}`}
                    id="rentroNav"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-md-0 align-items-center">
                        {navLinks.map(({ to, text }) => (
                            <li className="nav-item" key={to}>
                                <Link
                                    to={to}
                                    className="nav-link nav-link-hover"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {text}
                                </Link>
                            </li>
                        ))}
                        
                        
                        {/* Logout button with icon */}
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-danger ms-1 ms-md-2 d-flex align-items-center"
                                onClick={handleLogout}
                            >
                                <FiLogOut className="me-2" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Custom CSS remains the same */}
            <style>{`
                .nav-link-hover { 
                    position:relative; 
                    transition:color .3s 
                }
                .nav-link-hover:hover { 
                    color:#0d6efd 
                }
                .nav-link-hover::after{
                    content:""; 
                    position:absolute; 
                    left:0; 
                    bottom:0;
                    height:2px; 
                    width:0; 
                    background:#0d6efd; 
                    transition:width .3s
                }
                .nav-link-hover:hover::after{ 
                    width:100% 
                }
                .disabled {
                    color: #dee2e6 !important;
                    pointer-events: none;
                }
                @media (max-width: 767.98px) {
                    .btn-outline-danger {
                        width: 100%;
                        text-align: left;
                        padding-left: 1rem;
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