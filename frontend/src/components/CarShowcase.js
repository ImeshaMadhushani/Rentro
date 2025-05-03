import React from "react";
import carImg from "../assests/car.png"; // Replace with actual image

const CarShowcase = () => {
    return (
        <section className="container my-5 py-4">
            <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div
                        className="position-relative rounded-4 overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                            minHeight: "350px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2rem"
                        }}
                    >
                        <img
                            src={carImg}
                            alt="Premium rental car"
                            className="img-fluid position-relative z-2"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                transition: "transform 0.3s ease",
                                objectFit: "contain"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                        {/* Decorative elements */}
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 z-1"
                            style={{
                                background: "radial-gradient(circle at 20% 50%, rgba(0,123,255,0.1) 0%, transparent 40%)"
                            }}
                        ></div>
                        <div
                            className="position-absolute bottom-0 end-0 w-100 h-100 z-1"
                            style={{
                                background: "radial-gradient(circle at 80% 70%, rgba(0,123,255,0.1) 0%, transparent 40%)"
                            }}
                        ></div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h2 className="mb-4 fw-bold" style={{ color: "#2c3e50" }}>
                        Why Choose Our Rental Service
                    </h2>
                    <ul className="list-unstyled">
                        {[
                            {
                                number: 1,
                                title: "Wide Range of Vehicles",
                                description: "From fuel-efficient economy cars to luxury sedans and spacious SUVs, we have a vehicle for every need."
                            },
                            {
                                number: 2,
                                title: "Easy & Fast Booking",
                                description: "Our seamless online booking system allows you to reserve your car in just a few clicks. No lengthy paperwork, no hassle!"
                            },
                            {
                                number: 3,
                                title: "Flexible Rental Plans",
                                description: "Whether you need a car for a few hours, days, or weeks, we offer flexible rental options to suit your schedule."
                            },
                            {
                                number: 4,
                                title: "Premium Customer Service",
                                description: "Our dedicated support team is available 24/7 to assist you with bookings, inquiries, and roadside assistance."
                            }
                        ].map((item) => (
                            <li
                                key={item.number}
                                className="mb-4 p-3 rounded-3 d-flex"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    alignItems: "flex-start"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e9ecef"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                            >
                                <span
                                    className="badge bg-primary me-3 p-2 rounded-circle flex-shrink-0"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {item.number}
                                </span>
                                <div>
                                    <strong style={{ color: "#2c3e50" }}>{item.title}</strong>
                                    <p className="mt-2 mb-0" style={{ color: "#7f8c8d" }}>
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CarShowcase;