import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import car from '../assests/car.png'; // Make sure this path points to your default car image
import { FiStar } from 'react-icons/fi';

// Define your API base URL here or import it from a config file
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
//const VEHICLES_API = `${API_BASE_URL}/api/vehicles`;

const ViewDetails = () => {
    const { id } = useParams();
    console.log("🚗 Vehicle ID from URL:", id);
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/vehicles/${id}`);
                setVehicle(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching vehicle details:', err);
                setError('Failed to load vehicle details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVehicleDetails();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!vehicle) {
        return <div>Vehicle not found</div>;
    }

    return (
        <>
            <Header />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={vehicle.image || car}
                            alt={`${vehicle.brand} ${vehicle.name}`}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{vehicle.brand} {vehicle.name}</h1>
                        <p className="text-muted">{vehicle.type} • {vehicle.category}</p>

                        <div className="d-flex align-items-center mb-3">
                            <span className="badge bg-primary me-2">
                                <FiStar className="me-1" /> {vehicle.rating || 'N/A'}
                            </span>
                            <span className="text-success">
                                {vehicle.available ? 'Available' : 'Not Available'}
                            </span>
                        </div>

                        <h3 className="text-primary">${vehicle.dailyPrice} <small className="text-muted">per day</small></h3>

                        <div className="mb-4">
                            <h4>Specifications</h4>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Transmission:</strong> {vehicle.transmission}
                                </li>
                                <li className="list-group-item">
                                    <strong>Fuel Type:</strong> {vehicle.fuelType}
                                </li>
                                <li className="list-group-item">
                                    <strong>Seating Capacity:</strong> {vehicle.seatingCapacity}
                                </li>
                                <li className="list-group-item">
                                    <strong>Air Conditioning:</strong> {vehicle.hasAC ? 'Yes' : 'No'}
                                </li>
                            </ul>
                        </div>

                        <button className="btn btn-primary btn-lg">Rent Now</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ViewDetails;