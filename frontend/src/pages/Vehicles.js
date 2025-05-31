import React, { useState, useEffect } from 'react';
import { FiFilter, FiDollarSign, FiChevronRight, FiStar, FiUsers, FiDroplet } from 'react-icons/fi';
import { GiGearStickPattern } from 'react-icons/gi';
import car from '../assests/car.png';
import { FiCloudSnow } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const VEHICLES_API = `${API_BASE_URL}/api/vehicles`;

const Vehicles = () => {
    // Filter states
    const [selectedGroup, setSelectedGroup] = useState('All vehicles');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Data states
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 12,
        totalPages: 1,
        totalElements: 0
    });

    // Map backend fields to frontend expected format
    // Updated mapVehicleData function to handle your database schema
    const mapVehicleData = (vehicle) => {
        // Map database category/type to frontend expectations
        const categoryMap = {
            'Luxury': 'Luxury',
            'Standard': 'Mid Range',
            'Economy': 'Low Budget'
        };

        // Your database has category as vehicle type and type as category
        const actualType = vehicle.category; // SUV, Sedan, Hatchback
        const actualCategory = categoryMap[vehicle.type] || vehicle.type; // Luxury, Mid Range, Low Budget

        return {
            id: vehicle.id || 0,
            brand: vehicle.brand,
            model: vehicle.name, // Backend uses 'name', frontend expects 'model'
            category: actualCategory, // Map from type field
            type: actualType, // Map from category field  
            imageUrl: vehicle.image, // Backend uses 'image', frontend expects 'imageUrl'
            rating: vehicle.rating || 4.0,
            dailyPrice: Math.round((vehicle.dailyPrice || 0) / 100), // Convert large numbers to daily rates
            transmission: vehicle.transmission,
            fuelType: vehicle.fuelType,
            seats: vehicle.seatingCapacity, // Backend uses 'seatingCapacity', frontend expects 'seats'
            available: vehicle.available === true || vehicle.available === 1 || vehicle.available === '1', // Handle different boolean formats
            hasAC: vehicle.hasAC === true || vehicle.hasAC === 1 || vehicle.hasAC === '1', // Handle different boolean formats
            description: vehicle.description
        };
    };

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);

                

                // Fetch in parallel for better performance
                const [vehiclesRes, brandsRes, categoriesRes, typesRes] = await Promise.all([
                    axios.get(`${VEHICLES_API}`),
                    axios.get(`${VEHICLES_API}/brands`),
                    axios.get(`${VEHICLES_API}/categories`),
                    axios.get(`${VEHICLES_API}/types`)
                ]);

                console.log("Vehicles data:", vehiclesRes.data);

                // Map the vehicle data to match frontend expectations
                const mappedVehicles = vehiclesRes.data.map(mapVehicleData);

                setVehicles(mappedVehicles);
                setFilteredVehicles(mappedVehicles);
                setBrands(brandsRes.data.sort());
                setCategories(categoriesRes.data);
                setTypes(typesRes.data);

                setError(null);
            } catch (err) {
                console.error('Error fetching initial data:', err);
                setError('Failed to load data. Please try again later.');

                // Fallback mock data with correct structure
                const fallbackVehicles = [
                    { id: 1, brand: "Suzuki", model: "Alto", category: "Low Budget", type: "Hatchback", imageUrl: car, rating: 4.1, dailyPrice: 25, transmission: "Manual", fuelType: "Petrol", seats: 5, available: true, hasAC: true },
                    { id: 2, brand: "Toyota", model: "Corolla", category: "Mid Range", type: "Sedan", imageUrl: car, rating: 4.5, dailyPrice: 45, transmission: "Automatic", fuelType: "Petrol", seats: 5, available: true, hasAC: true },
                    { id: 3, brand: "BMW", model: "X5", category: "Luxury", type: "SUV", imageUrl: car, rating: 4.8, dailyPrice: 85, transmission: "Automatic", fuelType: "Petrol", seats: 5, available: true, hasAC: true }
                ];

                setVehicles(fallbackVehicles);
                setFilteredVehicles(fallbackVehicles);
                setBrands(["Suzuki", "Toyota", "BMW"]);
                setCategories(["Low Budget", "Mid Range", "Luxury"]);
                setTypes(["Hatchback", "Sedan", "SUV"]);
             } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Apply filters locally when data or filters change
    useEffect(() => {
        if (!vehicles.length) return;

        let filtered = [...vehicles];

        // Apply type filter
        if (selectedGroup !== 'All vehicles') {
            filtered = filtered.filter(v => v.type === selectedGroup);
        }

        // Apply brand filter
        if (selectedBrand) {
            filtered = filtered.filter(v => v.brand === selectedBrand);
        }

        // Apply category filter
        if (selectedCategory) {
            filtered = filtered.filter(v => v.category === selectedCategory);
        }

        // Apply price filter
        filtered = filtered.filter(v => {
            const price = v.dailyPrice || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(v =>
                v.brand.toLowerCase().includes(query) ||
                v.model.toLowerCase().includes(query) ||
                v.type.toLowerCase().includes(query) ||
                v.category.toLowerCase().includes(query)
            )
        }

        // Only show available vehicles
        filtered = filtered.filter(v => v.available !== false);

        setFilteredVehicles(filtered);
    }, [vehicles, selectedGroup, selectedBrand, selectedCategory, priceRange, searchQuery]);

    // Handle filter changes with proper backend integration
    const handleGroupChange = async (group) => {
        setSelectedGroup(group);
        setSelectedBrand(null);
        setSelectedCategory(null);

        try {
            setLoading(true);
            let response;

            if (group === 'All vehicles') {
                response = await axios.get(`${VEHICLES_API}`);
            } else {
                response = await axios.get(`${VEHICLES_API}/type/${group}`);
            }

            const mappedVehicles = response.data.map(mapVehicleData);
            setVehicles(mappedVehicles);
        } catch (err) {
            console.error(`Error fetching ${group} vehicles:`, err);
            setError('Failed to filter vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBrandChange = async (brand) => {
        setSelectedBrand(brand);
        setSelectedCategory(null);

        try {
            setLoading(true);
            let response;

            if (!brand) {
                response = await axios.get(`${VEHICLES_API}`);
            } else {
                response = await axios.get(`${VEHICLES_API}/brand/${brand}`);
            }

            const mappedVehicles = response.data.map(mapVehicleData);
            setVehicles(mappedVehicles);
        } catch (err) {
            console.error(`Error fetching ${brand} vehicles:`, err);
            setError('Failed to filter vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);

        try {
            setLoading(true);
            let response;

            if (!category) {
                response = await axios.get(`${VEHICLES_API}`);
            } else {
                response = await axios.get(`${VEHICLES_API}/category/${category}`);
            }

            const mappedVehicles = response.data.map(mapVehicleData);
            setVehicles(mappedVehicles);
        } catch (err) {
            console.error(`Error fetching ${category} vehicles:`, err);
            setError('Failed to filter vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            let response;

            if (searchQuery.trim()) {
                response = await axios.get(`${VEHICLES_API}/search?q=${encodeURIComponent(searchQuery)}`);
            } else {
                response = await axios.get(`${VEHICLES_API}`);
            }

            const mappedVehicles = response.data.map(mapVehicleData);
            setVehicles(mappedVehicles);
        } catch (err) {
            console.error('Error searching vehicles:', err);
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = async () => {
        setSelectedGroup('All vehicles');
        setSelectedBrand(null);
        setSelectedCategory(null);
        setPriceRange([0, 100]);
        setSearchQuery('');

        try {
            setLoading(true);
            const response = await axios.get(`${VEHICLES_API}`);
            const mappedVehicles = response.data.map(mapVehicleData);
            setVehicles(mappedVehicles);
        } catch (err) {
            console.error('Error resetting filters:', err);
            setError('Failed to reset filters. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !vehicles.length) {
        return (
            <>
                <Header />
                <div className="container-fluid py-4">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted">Loading vehicles...</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container-fluid py-4">
                {error && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Notice:</strong> {error}
                        <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                    </div>
                )}

                <div className="row">
                    {/* Mobile Filter Toggle */}
                    <div className="col-12 d-md-none mb-3">
                        <button
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FiFilter className="me-2" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filters Column */}
                    <div className={`col-md-3 ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
                        <div className="card shadow-sm mb-4 sticky-top" style={{ top: '20px' }}>
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <FiFilter className="me-2" />
                                    Filters
                                </h5>
                            </div>
                            <div className="card-body">
                                {/* Search Form */}
                                <form onSubmit={handleSearch} className="mb-4">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search vehicles..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button className="btn btn-primary" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </form>

                                {/* Vehicle Type Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Vehicle Type</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        <button
                                            className={`btn btn-sm ${selectedGroup === 'All vehicles' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleGroupChange('All vehicles')}
                                        >
                                            All vehicles
                                        </button>
                                        {types.map(type => (
                                            <button
                                                key={type}
                                                className={`btn btn-sm ${selectedGroup === type ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleGroupChange(type)}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Brand Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Brand</h6>
                                    <div className="list-group">
                                        <button
                                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!selectedBrand ? 'active' : ''}`}
                                            onClick={() => handleBrandChange(null)}
                                        >
                                            All Brands
                                            {!selectedBrand && <FiChevronRight />}
                                        </button>
                                        {brands.map(brand => (
                                            <button
                                                key={brand}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedBrand === brand ? 'active' : ''}`}
                                                onClick={() => handleBrandChange(brand)}
                                            >
                                                {brand}
                                                {selectedBrand === brand && <FiChevronRight />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Category</h6>
                                    <div className="list-group">
                                        <button
                                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!selectedCategory ? 'active' : ''}`}
                                            onClick={() => handleCategoryChange(null)}
                                        >
                                            All Categories
                                            {!selectedCategory && <FiChevronRight />}
                                        </button>
                                        {categories.map(category => (
                                            <button
                                                key={category}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedCategory === category ? 'active' : ''}`}
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                {category}
                                                {selectedCategory === category && <FiChevronRight />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Price Range</h6>
                                    <div className="px-2">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="badge bg-light text-dark">${priceRange[0]}</span>
                                            <span className="badge bg-light text-dark">${priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            className="form-range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        />
                                        <div className="d-flex justify-content-between mt-1">
                                            <small className="text-muted">Min</small>
                                            <small className="text-muted">Max</small>
                                        </div>
                                    </div>
                                </div>

                                {/* Reset Filters Button */}
                                <button
                                    className="btn btn-outline-danger w-100 mt-2"
                                    onClick={resetFilters}
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="col-md-9">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                            <div>
                                <h2 className="mb-1">
                                    {selectedBrand || 'All'} {selectedGroup !== 'All vehicles' ? selectedGroup : 'Vehicles'}
                                    {selectedCategory && ` (${selectedCategory})`}
                                </h2>
                                <p className="text-muted mb-0">
                                    Showing {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}
                                </p>
                            </div>
                            <div className="mt-2 mt-md-0">
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <FiDollarSign />
                                    </span>
                                    <select
                                        className="form-select"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    >
                                        <option value="30">Under $30</option>
                                        <option value="50">Under $50</option>
                                        <option value="70">Under $70</option>
                                        <option value="100">All Prices</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {filteredVehicles.length === 0 ? (
                            <div className="card shadow-sm">
                                <div className="card-body text-center py-5">
                                    <h4 className="text-muted mb-3">No vehicles found</h4>
                                    <p className="text-muted mb-4">
                                        Try adjusting your filters to see more results
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={resetFilters}
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {filteredVehicles.map((vehicle, index) => (
                                    <div key={vehicle.id || `fallback-${index}`} className="col-lg-4 col-md-6">
                                        <div className="card h-100 shadow-sm border-0 overflow-hidden hover-scale">
                                            <div className="position-relative">
                                                <img
                                                    src={vehicle.imageUrl || car}
                                                    alt={`${vehicle.brand} ${vehicle.model}`}
                                                    className="card-img-top img-fluid"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <span className={`badge position-absolute top-0 end-0 m-2 ${vehicle.category === 'Luxury' ? 'bg-warning text-dark' : vehicle.category === 'Mid Range' ? 'bg-info' : 'bg-success'}`}>
                                                    {vehicle.category}
                                                </span>
                                                <div className="position-absolute bottom-0 start-0 m-2">
                                                    <span className="badge bg-white text-dark">
                                                        <FiStar className="text-warning me-1" />
                                                        {vehicle.rating || 4.0}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h5 className="card-title mb-0">{vehicle.brand} {vehicle.model}</h5>
                                                        <p className="text-muted small mb-0">{vehicle.type}</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <h4 className="text-primary mb-0">${vehicle.dailyPrice}</h4>
                                                        <small className="text-muted">per day</small>
                                                    </div>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <GiGearStickPattern className="me-1" />
                                                        {vehicle.transmission}
                                                    </span>
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <FiDroplet className="me-1" />
                                                        {vehicle.fuelType}
                                                    </span>
                                                    {vehicle.hasAC && (
                                                        <span className="d-flex align-items-center text-muted small">
                                                            <FiCloudSnow className="me-1" />
                                                            A/C
                                                        </span>
                                                    )}
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <FiUsers className="me-1" />
                                                        {vehicle.seats} Seats
                                                    </span>
                                                </div>

                                                <div className="d-grid">
                                                    <Link
                                                        to={`/viewdetails/${index+1}`}
                                                        className="btn btn-outline-primary"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Vehicles;