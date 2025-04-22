import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { to: "/home", text: "Home" },
        { to: "/vehicles", text: "Vehicles" },
        { to: "/details", text: "Details" },
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        { to: "/rewards", text: "Reward" },
    ];

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
                    {/* you can replace this with Bootstrap’s default by removing the span */}
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* links */}
                <div
                    className={`collapse navbar-collapse${isOpen ? " show" : ""}`}
                    id="rentroNav"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-md-0">
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
                    </ul>
                </div>
            </div>

            {/* hover underline & basic custom styling */}
            <style>{`
        .nav-link-hover { position:relative; transition:color .3s }
        .nav-link-hover:hover { color:#0d6efd }
        .nav-link-hover::after{
          content:""; position:absolute; left:0; bottom:0;
          height:2px; width:0; background:#0d6efd; transition:width .3s
        }
        .nav-link-hover:hover::after{ width:100% }
      `}</style>
        </header>
    );
};

export default Header;
