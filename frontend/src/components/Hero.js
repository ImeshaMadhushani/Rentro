import React, { useState } from "react";
//import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
//import L from 'leaflet';
//import 'leaflet/dist/leaflet.css';
import '../styles/Hero.css';
import car from "../assests/car.png";

// Fix Leaflet default icon issue
/* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationPicker = ({ selectedLocation, setSelectedLocation }) => {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setSelectedLocation(e.latlng);
            }
        });
        return <Marker position={selectedLocation} />;
    };

    return (
        <>
            <MapContainer
                center={[7.8731, 80.7718]}
                zoom={7}
                scrollWheelZoom={false}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationMarker />
            </MapContainer>
            <div className="text-muted mt-2 small">
                Selected Coordinates: <strong>{selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</strong>
            </div>
        </>
    );
};
 */

const Hero = () => {
    // States
    //const [pickupCoords, setPickupCoords] = useState({ lat: 7.8731, lng: 80.7718 });
    //const [dropoffCoords, setDropoffCoords] = useState({ lat: 7.8731, lng: 80.7718 });
    const [formData, setFormData] = useState({
        carType: '',
        pickupBranch: '',
        dropoffLocation: '',
        pickupDate: '',
        returnDate: ''
    });

    // Car types
    const carTypes = [
        { brand: "Suzuki", name: "Alto", category: "Low Budget" },
        { brand: "Tata", name: "Nano", category: "Low Budget" },
        { brand: "Hyundai", name: "Santro", category: "Low Budget" },
        { brand: "Datsun", name: "Redi-GO", category: "Low Budget" },
        { brand: "Maruti", name: "WagonR", category: "Low Budget" },
        { brand: "Chevrolet", name: "Spark", category: "Low Budget" },
        { brand: "Renault", name: "KWID", category: "Low Budget" },
        { brand: "Toyota", name: "Corolla", category: "Mid Range" },
        { brand: "Honda", name: "Civic", category: "Mid Range" },
        { brand: "Kia", name: "Sportage", category: "Mid Range" },
        { brand: "Hyundai", name: "Elantra", category: "Mid Range" },
        { brand: "Ford", name: "EcoSport", category: "Mid Range" },
        { brand: "Nissan", name: "Altima", category: "Mid Range" },
        { brand: "Volkswagen", name: "Jetta", category: "Mid Range" },
        { brand: "Mazda", name: "CX-5", category: "Mid Range" },
        { brand: "BMW", name: "X5", category: "Luxury" },
        { brand: "Mercedes-Benz", name: "C-Class", category: "Luxury" },
        { brand: "Audi", name: "A4", category: "Luxury" },
        { brand: "Tesla", name: "Model 3", category: "Luxury" },
        { brand: "Jaguar", name: "XF", category: "Luxury" },
        { brand: "Lexus", name: "RX", category: "Luxury" },
        { brand: "Porsche", name: "Cayenne", category: "Luxury" },
        { brand: "Land Rover", name: "Range Rover Evoque", category: "Luxury" }
    ];

    const locations = [
        "Colombo", "Kandy", "Galle", "Jaffna", "Vavuniya",
        "Negombo", "Anuradhapura", "Batticaloa", "Trincomalee", "Matara"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            ...formData,
          //  pickupCoords,
          //  dropoffCoords
        });
        alert("Booking Submitted! Check console for data.");
    };

   return (
    <section className="hero-wrapper position-relative overflow-hidden">
      {/* floating blurred car (hidden < lg) */}
      <img src={car} alt="sports car" className="hero-car-img d-none d-lg-block" />

      <div className="container-xl py-4">
        <div className="row g-5 align-items-center flex-lg-row">
          {/* text  */}
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h1 className="display-5 fw-bold lh-sm mb-3">
              Drive Your Way,
              <br className="d-none d-md-block" />
              Anytime, Anywhere
            </h1>
            <p className="lead opacity-75 mb-4">
              Discover the perfect car for every occasion. Whether you’re going on a family
              trip, a business meeting, or a weekend getaway, Rentro has the ideal vehicle
              for you.
            </p>
            <button className="btn btn-warning fw-semibold px-4 py-2 rounded-pill shadow-sm">
              View All Cars
            </button>
          </div>

          {/* form */}
          <div className="col-12 col-lg-5 offset-lg-1">
            <div className="booking-card p-4 p-md-5 shadow-lg rounded-4 bg-white">
              <h4 className="text-primary fw-bold text-center mb-4">Book Your Car</h4>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Car type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Car Type</label>
                  <select
                    className="form-select"
                    name="carType"
                    value={formData.carType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Car Type</option>
                    {["Low Budget", "Mid Range", "Luxury"].map((cat) => (
                      <optgroup key={cat} label={cat}>
                        {carTypes.filter(c => c.category === cat).map((c, i) => (
                          <option key={i} value={`${c.brand}-${c.name}`}>
                            {c.brand} - {c.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* pick up */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Place of Rental</label>
                  <select
                    className="form-select"
                    name="pickupBranch"
                    value={formData.pickupBranch}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a branch</option>
                    {locations.map((l, i) => (
                      <option key={i} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* return */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Place of Return</label>
                  <select
                    className="form-select"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a branch</option>
                    {locations.map((l, i) => (
                      <option key={i} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* dates */}
                <div className="row">
                  <div className="col-12 col-sm-6 mb-3">
                    <label className="form-label fw-semibold">Pick‑up Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6 mb-3">
                    <label className="form-label fw-semibold">Return Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-warning w-100 fw-bold py-2 rounded-pill">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;