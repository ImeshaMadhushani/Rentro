import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// List of Sri Lankan main cities with approximate coordinates (latitude, longitude)
const SRI_LANKAN_CITIES = [
    { name: 'Colombo', lat: 6.9271, lng: 79.8612 },
    { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
    { name: 'Galle', lat: 6.0535, lng: 80.2210 },
    { name: 'Jaffna', lat: 9.6615, lng: 80.0255 },
    { name: 'Negombo', lat: 7.2096, lng: 79.8361 },
    { name: 'Anuradhapura', lat: 8.3114, lng: 80.4037 },
    { name: 'Polonnaruwa', lat: 7.9329, lng: 81.0081 },
    { name: 'Trincomalee', lat: 8.5922, lng: 81.2357 },
    { name: 'Batticaloa', lat: 7.7167, lng: 81.7000 },
    { name: 'Matara', lat: 5.9556, lng: 80.5494 },
    { name: 'Ratnapura', lat: 6.6847, lng: 80.4036 },
    { name: 'Badulla', lat: 6.9934, lng: 81.0550 },
    { name: 'Kurunegala', lat: 7.4863, lng: 80.3623 },
    { name: 'Puttalam', lat: 8.0362, lng: 79.8283 },
    { name: 'Kalutara', lat: 6.5854, lng: 79.9607 },
    { name: 'Gampaha', lat: 7.0899, lng: 79.9994 },
    { name: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891 },
    { name: 'Hambantota', lat: 6.1240, lng: 81.1188 },
    { name: 'Ampara', lat: 7.2975, lng: 81.6820 },
    { name: 'Mannar', lat: 8.9776, lng: 79.9095 },
    { name: 'Vavuniya', lat: 8.7562, lng: 80.4931 },
    { name: 'Kilinochchi', lat: 9.3871, lng: 80.3989 },
    { name: 'Mullaitivu', lat: 9.2671, lng: 80.8142 }
];

// Price per kilometer (in USD)
const PRICE_PER_KM = 0.75;

const RentCar = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
    const [totalPrice, setTotalPrice] = useState(0);
    const [distance, setDistance] = useState(0);
    const [distancePrice, setDistancePrice] = useState(0);
    const [durationPrice, setDurationPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [pickupLocation, setPickupLocation] = useState('Colombo');
    const [dropoffLocation, setDropoffLocation] = useState('Colombo');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loadingVehicle, setLoadingVehicle] = useState(true);
    const [paymentReference, setPaymentReference] = useState('');

    // Calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Fetch vehicle details
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/vehicles/${id}`);
                setVehicle(response.data);
            } catch (err) {
                console.error('Error fetching vehicle:', err);
                setError('Failed to load vehicle details');
            } finally {
                setLoadingVehicle(false);
            }
        };

        // If vehicle data was passed via location state, use that
        if (location.state?.vehicle) {
            setVehicle(location.state.vehicle);
            setLoadingVehicle(false);
        } else {
            // Otherwise fetch the vehicle details using the ID from URL
            fetchVehicle();
        }
    }, [id, location.state]);

    // Calculate distance and prices when locations or dates change
    useEffect(() => {
        if (vehicle && startDate && endDate && pickupLocation && dropoffLocation) {
            // Calculate duration price
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
            const durationPrice = days * vehicle.dailyPrice;
            setDurationPrice(durationPrice);

            // Calculate distance price
            const pickupCity = SRI_LANKAN_CITIES.find(city => city.name === pickupLocation);
            const dropoffCity = SRI_LANKAN_CITIES.find(city => city.name === dropoffLocation);

            if (pickupCity && dropoffCity) {
                const distance = calculateDistance(
                    pickupCity.lat, pickupCity.lng,
                    dropoffCity.lat, dropoffCity.lng
                );
                setDistance(distance);
                const distancePrice = distance * PRICE_PER_KM;
                setDistancePrice(distancePrice);

                // Calculate total price
                setTotalPrice(durationPrice + distancePrice);
            }
        }
    }, [startDate, endDate, vehicle, pickupLocation, dropoffLocation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                throw new Error('User not authenticated');
            }

            if (!vehicle?.id) {
                throw new Error('Vehicle information is missing');
            }

            const rentalData = {
                vehicleId: vehicle.id,
                userId: user.id,
                pickupDate: startDate.toISOString().split('T')[0],
                returnDate: endDate.toISOString().split('T')[0],
                pickupLocation,
                dropoffLocation,
                distance: distance.toFixed(2),
                paymentMethod: paymentMethod === 'credit' ? 'Credit Card' :
                    paymentMethod === 'debit' ? 'Debit Card' : 'PayPal',
                totalAmount: totalPrice,
                rentalDays: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1,
                dailyRate: vehicle.dailyPrice,
                distanceRate: PRICE_PER_KM
            };

            // Generate a mock payment reference
            const paymentReference = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            setPaymentReference(paymentReference);

            // First create the rental
            const rentalResponse = await axios.post(
                `${API_BASE_URL}/api/rentals`,
                rentalData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );

            // Then update the rental status to CONFIRMED with payment reference
            await axios.put(
                `${API_BASE_URL}/api/rentals/${rentalResponse.data.id}/status`,
                {
                    status: 'CONFIRMED',
                    paymentReference: paymentReference
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );

            setSuccess(true);
        } catch (err) {
            console.error('Error creating rental:', err);
            setError(err.response?.data?.message || err.message || 'Failed to process rental. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (loadingVehicle) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading vehicle details...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!vehicle) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-danger">
                        {error || 'Vehicle not found'}
                    </div>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => navigate('/vehicles')}
                    >
                        Back to Vehicles
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    if (success) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-success">
                        <h2>Rental Confirmed!</h2>
                        <p>Your rental for the {vehicle.brand} {vehicle.name} has been confirmed.</p>
                        <p>Pickup Location: {pickupLocation}</p>
                        <p>Drop-off Location: {dropoffLocation}</p>
                        <p>Distance: {distance.toFixed(2)} km</p>
                        <p>Total Paid: ${totalPrice.toFixed(2)}</p>
                        <p><strong>Payment Reference Number:</strong> {paymentReference}</p>
                        {/* <p>We've sent the confirmation details to your email.</p> */}
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/home')}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container py-5">
                <h1 className="mb-4">Complete Your Rental</h1>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <img
                                    src={vehicle.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={`${vehicle.brand} ${vehicle.name}`}
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                                />
                                <h3 className="card-title">{vehicle.brand} {vehicle.name}</h3>
                                <p className="text-muted">{vehicle.type} • {vehicle.category}</p>
                                <p>Daily Rate: <strong>${vehicle.dailyPrice?.toFixed(2)}</strong></p>
                                <p>Distance Rate: <strong>${PRICE_PER_KM.toFixed(2)} per km</strong></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Rental Details</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Pick-up Location</label>
                                        <select
                                            className="form-select"
                                            value={pickupLocation}
                                            onChange={(e) => setPickupLocation(e.target.value)}
                                            required
                                        >
                                            {SRI_LANKAN_CITIES.map(city => (
                                                <option key={`pickup-${city.name}`} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Drop-off Location</label>
                                        <select
                                            className="form-select"
                                            value={dropoffLocation}
                                            onChange={(e) => setDropoffLocation(e.target.value)}
                                            required
                                        >
                                            {SRI_LANKAN_CITIES.map(city => (
                                                <option key={`dropoff-${city.name}`} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pick-up Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Drop-off Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            minDate={startDate}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Payment Method</label>
                                        <select
                                            className="form-select"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            required
                                        >
                                            <option value="credit">Credit Card</option>
                                            <option value="debit">Debit Card</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    </div>

                                    {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
                                        <div className="mb-3">
                                            <h4>Card Details</h4>
                                            <div className="mb-3">
                                                <label className="form-label">Card Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardDetails.number}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="John Doe"
                                                    value={cardDetails.name}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="MM/YY"
                                                        value={cardDetails.expiry}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">CVV</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="123"
                                                        value={cardDetails.cvv}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            You will be redirected to PayPal to complete your payment.
                                        </div>
                                    )}

                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <h4>Total: <span className="text-primary">${totalPrice.toFixed(2)}</span></h4>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : 'Confirm Rental'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Rental Summary</h3>
                                <div className="mb-3">
                                    <p><strong>Vehicle:</strong> {vehicle.brand} {vehicle.name}</p>
                                    <p><strong>Type:</strong> {vehicle.type}</p>
                                    <p><strong>Seats:</strong> {vehicle.seatingCapacity}</p>
                                    <p><strong>Transmission:</strong> {vehicle.transmission}</p>
                                    <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
                                    <p><strong>AC:</strong> {vehicle.hasAC ? 'Yes' : 'No'}</p>
                                </div>

                                <hr />

                                <div className="mb-3">
                                    <h5>Location Details</h5>
                                    <p><strong>Pickup:</strong> {pickupLocation}</p>
                                    <p><strong>Drop-off:</strong> {dropoffLocation}</p>
                                    <p><strong>Distance:</strong> {distance.toFixed(2)} km</p>
                                </div>

                                <hr />

                                <div className="mb-3">
                                    <h5>Pricing Breakdown</h5>
                                    <div className="d-flex justify-content-between">
                                        <span>Daily Rate:</span>
                                        <span>${vehicle.dailyPrice?.toFixed(2)} × {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1} days</span>
                                        <span>${durationPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Distance Rate:</span>
                                        <span>${PRICE_PER_KM.toFixed(2)} × {distance.toFixed(2)} km</span>
                                        <span>${distancePrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <h5>Total:</h5>
                                    <h5>${totalPrice.toFixed(2)}</h5>
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

export default RentCar;