import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RentCar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle } = location.state || {};

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000)); // Default to next day
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Calculate total price when dates change
    useEffect(() => {
        if (vehicle && startDate && endDate) {
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
            setTotalPrice(days * vehicle.dailyPrice);
        }
    }, [startDate, endDate, vehicle]);

    if (!vehicle) {
        return (
            <div className="container text-center py-5">
                <h2>No vehicle selected</h2>
                <p>Please go back and select a vehicle to rent.</p>
                <button className="btn btn-primary" onClick={() => navigate('/vehicles')}>
                    Browse Vehicles
                </button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate success
        setSuccess(true);
    };

    if (success) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-success">
                        <h2>Rental Confirmed!</h2>
                        <p>Your rental for the {vehicle.brand} {vehicle.name} has been confirmed.</p>
                        <p>Total Paid: ${totalPrice.toFixed(2)}</p>
                        <p>We've sent the confirmation details to your email.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/vehicles')}
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
                                <h3 className="card-title">{vehicle.brand} {vehicle.name}</h3>
                                <p className="text-muted">{vehicle.type} • {vehicle.category}</p>
                                <p>Daily Rate: <strong>${vehicle.dailyPrice}</strong></p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Rental Dates</h3>
                                <form onSubmit={handleSubmit}>
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
                                    <h5>Pricing Breakdown</h5>
                                    <div className="d-flex justify-content-between">
                                        <span>Daily Rate:</span>
                                        <span>${vehicle.dailyPrice}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Rental Days:</span>
                                        <span>{Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1}</span>
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