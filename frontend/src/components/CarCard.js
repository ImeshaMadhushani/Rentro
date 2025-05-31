import React from "react";
import { Link } from 'react-router-dom';

const CarCard = ({ name, price,image }) => {
    return (
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
            <div className="card-body d-flex flex-column p-4">
                <div className="bg-light rounded-3 mb-3 d-flex align-items-center justify-content-center" style={{ height: "130px" }}>
                    {/* <i className="bi bi-car-front fs-1 text-muted"></i> */}
                    <img
                        src={image}
                        alt={name}
                        className="img-fluid h-100 w-100 object-fit-cover"
                    />
                </div>

                <div className="mb-2 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">{name}</h5>
                    <span className="badge bg-primary bg-opacity-10 text-primary">Popular</span>
                </div>

                <p className="text-muted small mb-2">Sedan • 5 Seats</p>

                <div className="d-flex gap-2 mb-3">
                    <span className="badge bg-light text-muted border">Automatic</span>
                    <span className="badge bg-light text-muted border">AC</span>
                    <span className="badge bg-light text-muted border">4 Doors</span>
                </div>

                <div className="mt-auto">
                    <div className="d-flex align-items-center mb-3">
                        <h4 className="fw-bold text-primary mb-0">${price}</h4>
                        <span className="text-muted ms-1 small">/ day</span>
                    </div>
        
                    <Link to="/viewdetails" className="text-decoration-none">
                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                        <i className="bi bi-eye-fill me-2"></i>
                        View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;