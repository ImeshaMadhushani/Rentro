import React from "react";

const features = [
    { title: "Availability", desc: "24/7 customer support for you", icon: "🕒" },
    { title: "Comfort & Safety", desc: "Our fleet is well-maintained for a smooth ride.", icon: "🛡️" },
    { title: "Affordable Prices", desc: "Get the best rates on car rentals.", icon: "💰" },
];

const Features = () => {
    return (
        <section className="container my-5">
            <div className="row text-center">
                {features.map((f, i) => (
                    <div className="col-md-4 mb-4" key={i}>
                        <div className="fs-1 mb-2">{f.icon}</div>
                        <h5 className="fw-bold">{f.title}</h5>
                        <p className="text-muted small">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
