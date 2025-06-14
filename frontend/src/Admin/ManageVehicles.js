import React, { useState, useEffect } from 'react';
import { FaCar } from 'react-icons/fa';
import axios from 'axios';

const ManageVehicles = ({ isMobile }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        brand: '',
        name: '',
        category: '',
        type: '',
        image: '',
        rating: 0,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seatingCapacity: 5,
        hasAC: true,
        dailyPrice: 0,
        available: true,
        description: ''
    });

    // Fetch vehicles from backend
    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });

            setVehicles(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching vehicles:', err);
            setError('Failed to load vehicles. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setFormData({
            brand: vehicle.brand,
            name: vehicle.name,
            category: vehicle.category,
            type: vehicle.type,
            image: vehicle.image,
            rating: vehicle.rating,
            transmission: vehicle.transmission,
            fuelType: vehicle.fuelType,
            seatingCapacity: vehicle.seatingCapacity,
            hasAC: vehicle.hasAC,
            dailyPrice: vehicle.dailyPrice,
            available: vehicle.available,
            description: vehicle.description
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;

            if (currentVehicle) {
                // Update existing vehicle using index+1 as ID
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/vehicles/${vehicles.indexOf(currentVehicle) + 1}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // Update the vehicle in state
                setVehicles(vehicles.map(v =>
                    vehicles.indexOf(v) === vehicles.indexOf(currentVehicle) ? response.data : v
                ));
                setSuccess('Vehicle updated successfully!');
            } else {
                // Add new vehicle
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/vehicles`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setVehicles([...vehicles, response.data]);
                setSuccess('Vehicle added successfully!');
            }

            setShowModal(false);
            setCurrentVehicle(null);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error saving vehicle:', err);
            setError(err.response?.data?.message || 'Failed to save vehicle. Please try again.');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleDelete = async (index) => {
        try {
            // Use index+1 as the ID for deletion
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/vehicles/${index + 1}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
            // Remove the vehicle from state
            setVehicles(vehicles.filter((v, i) => i !== index));
            setConfirmDelete(null);
            setSuccess('Vehicle deleted successfully!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error deleting vehicle:', err);
            setError(err.response?.data?.message || 'Failed to delete vehicle. Please try again.');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleToggleAvailability = async (index, currentStatus) => {
        try {
            // Use index+1 as the ID for updating availability
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/vehicles/${index + 1}/availability`,
                null,
                {
                    params: { available: !currentStatus },
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                    }
                }
            );
            // Update the vehicle's availability in state
            setVehicles(vehicles.map((v, i) =>
                i === index ? { ...v, available: !currentStatus } : v
            ));
            setSuccess(`Vehicle marked as ${!currentStatus ? 'available' : 'unavailable'}!`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating availability:', err);
            setError('Failed to update availability. Please try again.');
            setTimeout(() => setError(null), 3000);
        }
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setFormData({
            brand: '',
            name: '',
            category: '',
            type: '',
            image: '',
            rating: 0,
            transmission: 'Automatic',
            fuelType: 'Petrol',
            seatingCapacity: 5,
            hasAC: true,
            dailyPrice: 0,
            available: true,
            description: ''
        });
        setCurrentVehicle(null);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <h4 className="mb-3 mb-md-4 d-flex align-items-center">
                <FaCar className="me-2" /> Manage Vehicles
            </h4>

            {/* Success and Error Messages */}
            {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {success}
                    <button type="button" className="btn-close" onClick={() => setSuccess(null)}></button>
                </div>
            )}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'} mb-4`}>
                        <div className={`${isMobile ? 'mb-3' : 'me-3'}`}>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                Add New Vehicle
                            </button>
                        </div>
                        <div className="flex-grow-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search vehicles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Transmission</th>
                                    <th>Price/Day</th>
                                    <th>Fuel Type</th>
                                    <th>Seating Capacity</th>
                                    <th>AC</th>
                                    <th>Rating</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVehicles.length > 0 ? (
                                    filteredVehicles.map((vehicle, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {vehicle.image ? (
                                                    <img
                                                        src={vehicle.image}
                                                        alt={vehicle.name}
                                                        style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                                        style={{ width: '60px', height: '40px' }}>
                                                        <FaCar />
                                                    </div>
                                                )}
                                            </td>
                                            <td>{vehicle.brand}</td>
                                            <td>{vehicle.name}</td>
                                            <td>{vehicle.category}</td>
                                            <td>{vehicle.type}</td>
                                            <td>{vehicle.transmission}</td>
                                            <td>${vehicle.dailyPrice}</td>
                                            <td>{vehicle.fuelType}</td>
                                            <td>{vehicle.seatingCapacity}</td>
                                            <td>{vehicle.hasAC ? 'Yes' : 'No'}</td>
                                            <td>{vehicle.rating}</td>
                                            <td>{vehicle.description || 'No description'}</td>
                                            <td>
                                                <span
                                                    className={`badge ${vehicle.available ? 'bg-success' : 'bg-danger'} cursor-pointer`}
                                                    onClick={() => handleToggleAvailability(index, vehicle.available)}
                                                >
                                                    {vehicle.available ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEdit(vehicle)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => setConfirmDelete(index)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="15" className="text-center py-4">
                                            No vehicles found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Vehicle Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {currentVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setCurrentVehicle(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Brand*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Model Name*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Category*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Vehicle Type*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Image URL</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Rating</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="rating"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={formData.rating}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Transmission*</label>
                                            <select
                                                className="form-select"
                                                name="transmission"
                                                value={formData.transmission}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="Automatic">Automatic</option>
                                                <option value="Manual">Manual</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Fuel Type*</label>
                                            <select
                                                className="form-select"
                                                name="fuelType"
                                                value={formData.fuelType}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Electric">Electric</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Seating Capacity*</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="seatingCapacity"
                                                min="1"
                                                max="20"
                                                value={formData.seatingCapacity}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Daily Price ($)*</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="dailyPrice"
                                                min="0"
                                                step="0.01"
                                                value={formData.dailyPrice}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-check form-switch pt-4">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="hasAC"
                                                    checked={formData.hasAC}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Has AC</label>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="available"
                                                    checked={formData.available}
                                                    onChange={handleInputChange}
                                                />
                                                <label className="form-check-label">Available</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="3"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setShowModal(false);
                                                setCurrentVehicle(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            {currentVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete !== null && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setConfirmDelete(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this vehicle? This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setConfirmDelete(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(confirmDelete)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageVehicles;