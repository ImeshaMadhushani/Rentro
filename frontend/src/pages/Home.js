import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CarShowcase from "../components/CarShowcase";
import CarCard from "../components/CarCard";
import Header from "../components/Header";
import FactsInNumbers from "../components/FactsInNumbers";
import { Link } from "react-router-dom";
import car from "../assests/car.png";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <CarShowcase />
           

            <section className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold">Choose the car that suits you</h4>
                    <Link to="/vehicles" className="btn btn-link text-decoration-none">View All &rarr;</Link>
                </div>
                <div className="row g-4">
                    {[
                        { name: "Mercedes", price: 25, image: car },
                        { name: "Mercedes", price: 50, image: car },
                        { name: "Mercedes", price: 45, image: car },
                    ].map((car, index) => (
                        <div className="col-md-4" key={index}>
                            <CarCard {...car} />
                        </div>
                    ))}
                </div>
            </section>

            <FactsInNumbers />
            <ContactForm />
            <Footer/>

        </>
    );
};

export default Home;
