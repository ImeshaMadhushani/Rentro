import React, { useState, useEffect } from 'react';
import { FiFilter, FiDollarSign, FiChevronRight, FiStar, FiUsers, FiDroplet } from 'react-icons/fi';
import { GiGearStickPattern } from 'react-icons/gi';
import car from '../assests/car.png';
import { FiCloudSnow } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const VEHICLES_API = `${API_BASE_URL}/api/vehicles`;

const Vehicles = () => {
    // Filter states
    const [filters, setFilters] = useState({
        type: null,
        brand: null,
        category: null,
        minPrice: null,
        maxPrice: null,
        searchQuery: '',
        page: 0,
        size: 12,
        sortBy: 'brand',
        sortDirection: 'ASC'
    });

    // Data states
    const [vehicles, setVehicles] = useState([]);
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
    const [showFilters, setShowFilters] = useState(false);

    // Simplified mapping function - no need to swap category/type
    const mapVehicleData = (vehicle) => {
        return {
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.name,
            category: vehicle.category,
            type: vehicle.type,
            imageUrl: vehicle.image || car,
            rating: vehicle.rating || 4.0,
            dailyPrice: vehicle.dailyPrice,
            transmission: vehicle.transmission,
            fuelType: vehicle.fuelType,
            seats: vehicle.seatingCapacity,
            available: vehicle.available,
            hasAC: vehicle.hasAC,
            description: vehicle.description
        };
    };

    // Fetch vehicles with filters
    const fetchVehicles = async () => {
        try {
            setLoading(true);

            // Prepare filter params for backend
            const params = {
                brand: filters.brand,
                type: filters.type,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                page: filters.page,
                size: filters.size,
                sortBy: filters.sortBy,
                sortDirection: filters.sortDirection
            };

            // Use search endpoint if search query exists
            if (filters.searchQuery) {
                const response = await axios.get(`${VEHICLES_API}/search`, {
                    params: { q: filters.searchQuery }
                });
                const mappedVehicles = response.data.map(mapVehicleData);
                setVehicles(mappedVehicles);
            } else {
                // Use filter endpoint
                const response = await axios.post(`${VEHICLES_API}/filter`, params);
                const mappedVehicles = response.data.content.map(mapVehicleData);
                setVehicles(mappedVehicles);
                setPagination({
                    page: response.data.number,
                    size: response.data.size,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements
                });
            }
        } catch (err) {
            console.error('Error fetching vehicles:', err);
            setError('Failed to load vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch filter options
    const fetchFilterOptions = async () => {
        try {
            const [brandsRes, categoriesRes, typesRes] = await Promise.all([
                axios.get(`${VEHICLES_API}/brands`),
                axios.get(`${VEHICLES_API}/categories`),
                axios.get(`${VEHICLES_API}/types`)
            ]);

            setBrands(brandsRes.data);
            setCategories(categoriesRes.data);
            setTypes(typesRes.data);
        } catch (err) {
            console.error('Error fetching filter options:', err);
        }
    };

    // Initial data load
    useEffect(() => {
        const loadData = async () => {
            await fetchFilterOptions();
            await fetchVehicles();
        };
        loadData();
    }, []);

    // Update vehicles when filters change
    useEffect(() => {
        fetchVehicles();
    }, [filters]);

    // Handler functions
    const handleTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            type: type === 'All vehicles' ? null : type,
            page: 0 // Reset to first page
        }));
    };

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brand: brand,
            page: 0
        }));
    };

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            category: category,
            page: 0
        }));
    };

    const handlePriceChange = (min, max) => {
        setFilters(prev => ({
            ...prev,
            minPrice: min,
            maxPrice: max,
            page: 0
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters(prev => ({
            ...prev,
            searchQuery: prev.searchQuery,
            page: 0
        }));
    };

    const resetFilters = () => {
        setFilters({
            type: null,
            brand: null,
            category: null,
            minPrice: null,
            maxPrice: null,
            searchQuery: '',
            page: 0,
            size: 12,
            sortBy: 'brand',
            sortDirection: 'ASC'
        });
    };

    // Loading state
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
                                            value={filters.searchQuery}
                                            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
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
                                            className={`btn btn-sm ${!filters.type ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => handleTypeChange('All vehicles')}
                                        >
                                            All vehicles
                                        </button>
                                        {types.map(type => (
                                            <button
                                                key={type}
                                                className={`btn btn-sm ${filters.type === type ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => handleTypeChange(type)}
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
                                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!filters.brand ? 'active' : ''}`}
                                            onClick={() => handleBrandChange(null)}
                                        >
                                            All Brands
                                            {!filters.brand && <FiChevronRight />}
                                        </button>
                                        {brands.map(brand => (
                                            <button
                                                key={brand}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${filters.brand === brand ? 'active' : ''}`}
                                                onClick={() => handleBrandChange(brand)}
                                            >
                                                {brand}
                                                {filters.brand === brand && <FiChevronRight />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Category</h6>
                                    <div className="list-group">
                                        <button
                                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!filters.category ? 'active' : ''}`}
                                            onClick={() => handleCategoryChange(null)}
                                        >
                                            All Categories
                                            {!filters.category && <FiChevronRight />}
                                        </button>
                                        {categories.map(category => (
                                            <button
                                                key={category}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${filters.category === category ? 'active' : ''}`}
                                                onClick={() => handleCategoryChange(category)}
                                            >
                                                {category}
                                                {filters.category === category && <FiChevronRight />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-4">
                                    <h6 className="font-weight-bold mb-3">Price Range</h6>
                                    <div className="px-2">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="badge bg-light text-dark">${filters.minPrice || 0}</span>
                                            <span className="badge bg-light text-dark">${filters.maxPrice || 100}</span>
                                        </div>
                                        <input
                                            type="range"
                                            className="form-range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={filters.maxPrice || 100}
                                            onChange={(e) => handlePriceChange(filters.minPrice || 0, parseInt(e.target.value))}
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
                                    {filters.brand || 'All'} {filters.type || 'Vehicles'}
                                    {filters.category && ` (${filters.category})`}
                                </h2>
                                <p className="text-muted mb-0">
                                    Showing {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'}
                                </p>
                            </div>
                            <div className="mt-2 mt-md-0">
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <FiDollarSign />
                                    </span>
                                    <select
                                        className="form-select"
                                        value={filters.maxPrice || 100}
                                        onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                                    >
                                        <option value="30">Under $30</option>
                                        <option value="50">Under $50</option>
                                        <option value="70">Under $70</option>
                                        <option value="100">All Prices</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {vehicles.length === 0 ? (
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
                                {vehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="col-lg-4 col-md-6">
                                        <div className="card h-100 shadow-sm border-0 overflow-hidden hover-scale">
                                            <div className="position-relative">
                                                <img
                                                    src={vehicle.imageUrl}
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
                                                        {vehicle.rating}
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
                                                        to={`/viewdetails/${vehicle.id}`}
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