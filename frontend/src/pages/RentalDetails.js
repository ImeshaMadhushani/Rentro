// src/pages/RentalDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const RentalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/rentals/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setRental(response.data);

            } catch (err) {
                console.error('Error fetching rental details:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load rental details');
            } finally {
                setLoading(false);
            }
        };

        fetchRentalDetails();
    }, [id, navigate]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading rental details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!rental) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-danger">
                        {error || 'Rental not found'}
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => navigate('/profile')}
                    >
                        Back to Profile
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Rental Details</h1>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/profile')}
                    >
                        Back to Profile
                    </button>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">Vehicle Information</h3>
                                {rental.vehicle?.image && (
                                    <img
                                        src={rental.vehicle.image}
                                        alt={`${rental.vehicle.brand} ${rental.vehicle.name}`}
                                        className="img-fluid mb-3"
                                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                )}
                                <h4>{rental.vehicle?.brand} {rental.vehicle?.name}</h4>
                                <p className="text-muted">{rental.vehicle?.type} • {rental.vehicle?.category}</p>
                                <p><strong>Seats:</strong> {rental.vehicle?.seatingCapacity}</p>
                                <p><strong>Transmission:</strong> {rental.vehicle?.transmission}</p>
                                <p><strong>Fuel Type:</strong> {rental.vehicle?.fuelType}</p>
                                <p><strong>AC:</strong> {rental.vehicle?.hasAC ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-title">Rental Information</h3>
                                <div className="mb-3">
                                    <h5>Status</h5>
                                    <span className={`badge ${rental.status === 'CONFIRMED' ? 'bg-success' :
                                            rental.status === 'PENDING' ? 'bg-warning text-dark' :
                                                rental.status === 'CANCELLED' ? 'bg-danger' : 'bg-secondary'
                                        }`}>
                                        {rental.status}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <h5>Dates</h5>
                                    <p>
                                        <strong>Pickup:</strong> {new Date(rental.pickupDate).toLocaleDateString()} <br />
                                        <strong>Return:</strong> {new Date(rental.returnDate).toLocaleDateString()} <br />
                                        <strong>Duration:</strong> {rental.rentalDays} day{rental.rentalDays !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <h5>Locations</h5>
                                    <p>
                                        <strong>Pickup:</strong> {rental.pickupLocation} <br />
                                        <strong>Drop-off:</strong> {rental.dropoffLocation} <br />
                                        <strong>Distance:</strong> {rental.distance} km
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <h5>Payment</h5>
                                    <p>
                                        <strong>Method:</strong> {rental.paymentMethod} <br />
                                        <strong>Reference:</strong> {rental.paymentReference || 'N/A'} <br />
                                        <strong>Daily Rate:</strong> ${rental.dailyRate?.toFixed(2)} <br />
                                        <strong>Distance Rate:</strong> ${rental.distanceRate?.toFixed(2)} per km
                                    </p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <h4>Total: <span className="text-primary">${rental.totalAmount?.toFixed(2)}</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RentalDetails;