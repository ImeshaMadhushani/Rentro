import React, { useState } from 'react';
import { FiFilter, FiDollarSign, FiChevronRight, FiStar, FiUsers, FiDroplet } from 'react-icons/fi';
import { GiGearStickPattern } from 'react-icons/gi';
import car from '../assests/car.png';
import { FiCloudSnow } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const Vehicles = () => {
    const [selectedGroup, setSelectedGroup] = useState('All vehicles');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [showFilters, setShowFilters] = useState(false);

    const carTypes = [
        { brand: "Suzuki", name: "Alto", category: "Low Budget", type: "Hatchback", image: car, rating: 4.1 },
        { brand: "Tata", name: "Nano", category: "Low Budget", type: "Hatchback", image: car, rating: 3.8 },
        { brand: "Hyundai", name: "Santro", category: "Low Budget", type: "Hatchback", image: car, rating: 4.2 },
        { brand: "Datsun", name: "Redi-GO", category: "Low Budget", type: "Hatchback", image: car, rating: 3.9 },
        { brand: "Maruti", name: "WagonR", category: "Low Budget", type: "Hatchback", image: car, rating: 4.3 },
        { brand: "Chevrolet", name: "Spark", category: "Low Budget", type: "Hatchback", image: car, rating: 4.0 },
        { brand: "Renault", name: "KWID", category: "Low Budget", type: "Hatchback", image: car, rating: 4.1 },
        { brand: "Toyota", name: "Corolla", category: "Mid Range", type: "Sedan", image: car, rating: 4.5 },
        { brand: "Honda", name: "Civic", category: "Mid Range", type: "Sedan", image: car, rating: 4.6 },
        { brand: "Kia", name: "Sportage", category: "Mid Range", type: "SUV", image: car, rating: 4.4 },
        { brand: "Hyundai", name: "Elantra", category: "Mid Range", type: "Sedan", image: car, rating: 4.3 },
        { brand: "Ford", name: "EcoSport", category: "Mid Range", type: "SUV", image: car, rating: 4.2 },
        { brand: "Nissan", name: "Altima", category: "Mid Range", type: "Sedan", image: car, rating: 4.1 },
        { brand: "Volkswagen", name: "Jetta", category: "Mid Range", type: "Sedan", image: car, rating: 4.4 },
        { brand: "Mazda", name: "CX-5", category: "Mid Range", type: "SUV", image: car, rating: 4.5 },
        { brand: "BMW", name: "X5", category: "Luxury", type: "SUV", image: car, rating: 4.8 },
        { brand: "Mercedes-Benz", name: "C-Class", category: "Luxury", type: "Sedan", image: car, rating: 4.7 },
        { brand: "Audi", name: "A4", category: "Luxury", type: "Sedan", image: car, rating: 4.6 },
        { brand: "Tesla", name: "Model 3", category: "Luxury", type: "Sedan", image: car, rating: 4.9 },
        { brand: "Jaguar", name: "XF", category: "Luxury", type: "Sedan", image: car, rating: 4.5 },
        { brand: "Lexus", name: "RX", category: "Luxury", type: "SUV", image: car, rating: 4.7 },
        { brand: "Porsche", name: "Cayenne", category: "Luxury", type: "SUV", image: car, rating: 4.8 },
        { brand: "Land Rover", name: "Range Rover Evoque", category: "Luxury", type: "SUV", image: car, rating: 4.6 }
    ];

    // Get unique brands
    const brands = [...new Set(carTypes.map(car => car.brand))].sort();

    // Filter cars based on selected group
    const filteredCars = selectedGroup === 'All vehicles'
        ? carTypes
        : carTypes.filter(car => {
            if (selectedGroup === 'Sedan') return car.type === 'Sedan';
            if (selectedGroup === 'SUV') return car.type === 'SUV';
            if (selectedGroup === 'Hatchback') return car.type === 'Hatchback';
            return true;
        });

    // Filter by brand if selected
    const brandFilteredCars = selectedBrand
        ? filteredCars.filter(car => car.brand === selectedBrand)
        : filteredCars;

    // Filter by price range
    const priceFilteredCars = brandFilteredCars.filter(car => {
        const basePrice = car.category === 'Luxury' ? 70 : car.category === 'Mid Range' ? 40 : 20;
        const price = basePrice + (Math.random() * 20);
        return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort by brand name
    const sortedCars = [...priceFilteredCars].sort((a, b) => a.brand.localeCompare(b.brand));

    return (
        <>
            <Header/>
        <div className="container-fluid py-4">
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

                {/* Filters Column - Hidden on mobile when showFilters is false */}
                <div className={`col-md-3 ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
                    <div className="card shadow-sm mb-4 sticky-top" style={{ top: '20px' }}>
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0 d-flex align-items-center">
                                <FiFilter className="me-2" />
                                Filters
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h6 className="font-weight-bold mb-3">Vehicle Type</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {['All vehicles', 'Sedan', 'SUV', 'Hatchback'].map(group => (
                                        <button
                                            key={group}
                                            className={`btn btn-sm ${selectedGroup === group ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => {
                                                setSelectedGroup(group);
                                                setSelectedBrand(null);
                                            }}
                                        >
                                            {group}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="font-weight-bold mb-3">Brand</h6>
                                <div className="list-group">
                                    <button
                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!selectedBrand ? 'active' : ''}`}
                                        onClick={() => setSelectedBrand(null)}
                                    >
                                        All Brands
                                        {!selectedBrand && <FiChevronRight />}
                                    </button>
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedBrand === brand ? 'active' : ''}`}
                                            onClick={() => setSelectedBrand(brand)}
                                        >
                                            {brand}
                                            {selectedBrand === brand && <FiChevronRight />}
                                        </button>
                                    ))}
                                </div>
                            </div>

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
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="col-md-9">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                        <div>
                            <h2 className="mb-1">
                                {selectedBrand || 'All'} {selectedGroup !== 'All vehicles' ? selectedGroup : 'Vehicles'}
                            </h2>
                            <p className="text-muted mb-0">
                                Showing {sortedCars.length} {sortedCars.length === 1 ? 'vehicle' : 'vehicles'}
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

                    {sortedCars.length === 0 ? (
                        <div className="card shadow-sm">
                            <div className="card-body text-center py-5">
                                <h4 className="text-muted mb-3">No vehicles found</h4>
                                <p className="text-muted mb-4">
                                    Try adjusting your filters to see more results
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSelectedGroup('All vehicles');
                                        setSelectedBrand(null);
                                        setPriceRange([0, 100]);
                                    }}
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {sortedCars.map((car, index) => {
                                const basePrice = car.category === 'Luxury' ? 70 : car.category === 'Mid Range' ? 40 : 20;
                                const dailyPrice = Math.floor(basePrice + (Math.random() * 20));
                                const transmission = Math.random() > 0.5 ? 'Automatic' : 'Manual';

                                return (
                                    <div key={index} className="col-lg-4 col-md-6">
                                        <div className="card h-100 shadow-sm border-0 overflow-hidden hover-scale">
                                            <div className="position-relative">
                                                <img
                                                    src={car.image}
                                                    alt={`${car.brand} ${car.name}`}
                                                    className="card-img-top img-fluid"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <span className={`badge position-absolute top-0 end-0 m-2 ${car.category === 'Luxury' ? 'bg-warning text-dark' : car.category === 'Mid Range' ? 'bg-info' : 'bg-success'}`}>
                                                    {car.category}
                                                </span>
                                                <div className="position-absolute bottom-0 start-0 m-2">
                                                    <span className="badge bg-white text-dark">
                                                        <FiStar className="text-warning me-1" />
                                                        {car.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h5 className="card-title mb-0">{car.brand} {car.name}</h5>
                                                        <p className="text-muted small mb-0">{car.type}</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <h4 className="text-primary mb-0">${dailyPrice}</h4>
                                                        <small className="text-muted">per day</small>
                                                    </div>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <GiGearStickPattern className="me-1" />
                                                        {transmission}
                                                    </span>
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <FiDroplet className="me-1" />
                                                        Petrol
                                                    </span>
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <FiCloudSnow className="me-1" />
                                                        A/C
                                                    </span>
                                                    <span className="d-flex align-items-center text-muted small">
                                                        <FiUsers className="me-1" />
                                                        5 Seats
                                                    </span>
                                                </div>

                                                <div className="d-grid">
                                                    <Link to='/viewdetails' className="btn btn-outline-primary">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            </div>
            <Footer/>
        </>
    );
};

export default Vehicles;