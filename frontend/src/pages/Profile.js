// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRental, setExpandedRental] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.token) {
                    navigate('/login');
                    return;
                }

                // Fetch user details
                const userResponse = await axios.get(`${API_BASE_URL}/api/users/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setUser(userResponse.data);

                // Fetch user's rentals with more details
                const rentalsResponse = await axios.get(`${API_BASE_URL}/api/rentals/user`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setRentals(rentalsResponse.data);

            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/login');
    };

    const toggleRentalDetails = (rentalId) => {
        setExpandedRental(expandedRental === rentalId ? null : rentalId);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading profile...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-danger">
                        {error || 'User not found'}
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
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
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <div className="mb-3">
                                    <span className="bg-primary text-white rounded-circle p-4 d-inline-flex align-items-center justify-content-center" style={{ fontSize: '2rem' }}>
                                        {user.fullName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="card-title">{user.fullName}</h3>
                                <p className="text-muted">{user.role}</p>
                                <hr />
                                <div className="text-start">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone:</strong> {user.phone}</p>
                                </div>
                                <button
                                    className="btn btn-danger mt-3"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Your Rental History</h3>

                                {rentals.length === 0 ? (
                                    <div className="alert alert-info">
                                        You haven't made any rentals yet.
                                    </div>
                                ) : (
                                    <div className="rentals-list">
                                        {rentals.map(rental => (
                                            <div key={rental.id} className="card mb-3">
                                                <div className="card-header d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>{rental.vehicle?.brand} {rental.vehicle?.name}</strong>
                                                        <span className={`badge ms-2 ${rental.status === 'CONFIRMED' ? 'bg-success' :
                                                            rental.status === 'PENDING' ? 'bg-warning text-dark' :
                                                                rental.status === 'CANCELLED' ? 'bg-danger' : 'bg-secondary'
                                                            }`}>
                                                            {rental.status}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => navigate(`/rentals/${rental.id}`)}
                                                        >
                                                            View Full
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => toggleRentalDetails(rental.id)}
                                                        >
                                                            {expandedRental === rental.id ? 'Hide' : 'Show'} Details
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p><strong>Dates:</strong> {new Date(rental.pickupDate).toLocaleDateString()} - {new Date(rental.returnDate).toLocaleDateString()}</p>
                                                            <p><strong>Locations:</strong> {rental.pickupLocation} → {rental.dropoffLocation}</p>
                                                            <p><strong>Total:</strong> ${rental.totalAmount?.toFixed(2)}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p><strong>Payment Method:</strong> {rental.paymentMethod || 'Not specified'}</p>
                                                            <p><strong>Created At:</strong> {new Date(rental.createdAt).toLocaleString()}</p>
                                                            {rental.updatedAt && rental.updatedAt !== rental.createdAt && (
                                                                <p><strong>Last Updated:</strong> {new Date(rental.updatedAt).toLocaleString()}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {expandedRental === rental.id && (
                                                        <div className="mt-3 p-3 bg-light rounded">
                                                            <h5>Additional Details</h5>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <p><strong>Vehicle Type:</strong> {rental.vehicle?.type}</p>
                                                                    <p><strong>Vehicle Year:</strong> {rental.vehicle?.year}</p>
                                                                    <p><strong>Insurance:</strong> {rental.insuranceType || 'Standard'}</p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <p><strong>Mileage Limit:</strong> {rental.mileageLimit || 'Unlimited'} miles</p>
                                                                    <p><strong>Special Requests:</strong> {rental.specialRequests || 'None'}</p>
                                                                    {rental.cancellationReason && (
                                                                        <p><strong>Cancellation Reason:</strong> {rental.cancellationReason}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {rental.additionalDrivers && rental.additionalDrivers.length > 0 && (
                                                                <div className="mt-2">
                                                                    <strong>Additional Drivers:</strong>
                                                                    <ul>
                                                                        {rental.additionalDrivers.map((driver, index) => (
                                                                            <li key={index}>
                                                                                {driver.name} ({driver.licenseNumber})
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;