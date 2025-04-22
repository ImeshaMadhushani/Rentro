import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";

const Header = () => {
    // Bootstrap’s JS isn’t loaded in a typical CRA/​Vite setup, so we
    // control the “collapse” state with React instead
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((p) => !p);

    return (
        <>
            {/* Hover underline effect (your original CSS) */}
            <style>{`
        .nav-link-hover {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link-hover:hover { color: #0d6efd; }
        .nav-link-hover::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0;
          background-color: #0d6efd;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 100%; }
      `}</style>

            <header className="py-3 border-bottom shadow-sm bg-white sticky-top">
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <Link
                        to="/home"
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <img src={logo} alt="Rentro Logo" height="70" className="me-2" />
                    </Link>

                    {/* Hamburger button – visible < md */}
                    <button
                        className="navbar-toggler d-md-none border-0"
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={toggle}
                    >
                        {/* Bootstrap “hamburger” icon (three bars) */}
                        <span className="navbar-toggler-icon">
                            {/* Using simple bars so we don’t depend on Bootstrap JS icons */}
                            <div style={{ width: 22, height: 2, background: "#000" }} />
                            <div
                                style={{
                                    width: 22,
                                    height: 2,
                                    background: "#000",
                                    margin: "4px 0",
                                }}
                            />
                            <div style={{ width: 22, height: 2, background: "#000" }} />
                        </span>
                    </button>

                    {/* Navigation – always rendered, but collapse on small screens */}
                    <nav
                        className={`${open ? "d-block" : "d-none"
                            } d-md-flex gap-4 flex-column flex-md-row mt-3 mt-md-0`}
                    >
                        {/* Links */}
                        <Link
                            to="/home"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/vehicles"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            Vehicles
                        </Link>
                        <Link
                            to="/details"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            Details
                        </Link>
                        <Link
                            to="/about"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/rewards"
                            className="text-dark text-decoration-none nav-link-hover"
                            onClick={() => setOpen(false)}
                        >
                            Reward
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
