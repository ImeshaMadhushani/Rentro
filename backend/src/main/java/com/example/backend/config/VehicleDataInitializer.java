/*package com.example.backend.config;

import com.example.backend.model.Vehicle;
import com.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class VehicleDataInitializer implements CommandLineRunner {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (vehicleRepository.count() == 0) {
            initializeVehicleData();
        }
    }

    private void initializeVehicleData() {
        Vehicle[] vehicles = {
                new Vehicle(null, "Suzuki", "Alto", "Low Budget", "Hatchback", "/images/car.png", 4.1, "Manual",
                        "Petrol", 5, true, 20.0, true, "Compact and fuel-efficient hatchback perfect for city driving.",
                        null, null),
                new Vehicle(null, "Tata", "Nano", "Low Budget", "Hatchback", "/images/car.png", 3.8, "Manual", "Petrol",
                        4, true, 18.0, true, "Ultra-compact car ideal for urban commuting.", null, null),
                new Vehicle(null, "Hyundai", "Santro", "Low Budget", "Hatchback", "/images/car.png", 4.2, "Manual",
                        "Petrol", 5, true, 22.0, true, "Reliable and affordable hatchback with good fuel economy.",
                        null, null),
                new Vehicle(null, "Datsun", "Redi-GO", "Low Budget", "Hatchback", "/images/car.png", 3.9, "Manual",
                        "Petrol", 5, true, 19.0, true, "Sporty design with efficient performance.", null, null),
                new Vehicle(null, "Maruti", "WagonR", "Low Budget", "Hatchback", "/images/car.png", 4.3, "Automatic",
                        "Petrol", 5, true, 24.0, true, "Spacious interior with excellent mileage.", null, null),
                new Vehicle(null, "Chevrolet", "Spark", "Low Budget", "Hatchback", "/images/car.png", 4.0, "Automatic",
                        "Petrol", 5, true, 21.0, true, "Compact car with modern features.", null, null),
                new Vehicle(null, "Renault", "KWID", "Low Budget", "Hatchback", "/images/car.png", 4.1, "Manual",
                        "Petrol", 5, true, 20.0, true, "SUV-inspired design in a compact package.", null, null),
                new Vehicle(null, "Toyota", "Corolla", "Mid Range", "Sedan", "/images/car.png", 4.5, "Automatic",
                        "Petrol", 5, true, 45.0, true, "Reliable mid-size sedan with excellent build quality.", null,
                        null),
                new Vehicle(null, "Honda", "Civic", "Mid Range", "Sedan", "/images/car.png", 4.6, "Automatic", "Petrol",
                        5, true, 48.0, true, "Sporty sedan with premium features.", null, null),
                new Vehicle(null, "Kia", "Sportage", "Mid Range", "SUV", "/images/car.png", 4.4, "Automatic", "Petrol",
                        5, true, 52.0, true, "Compact SUV with advanced safety features.", null, null),
                new Vehicle(null, "Hyundai", "Elantra", "Mid Range", "Sedan", "/images/car.png", 4.3, "Automatic",
                        "Petrol", 5, true, 44.0, true, "Elegant sedan with modern technology.", null, null),
                new Vehicle(null, "Ford", "EcoSport", "Mid Range", "SUV", "/images/car.png", 4.2, "Automatic", "Petrol",
                        5, true, 46.0, true, "Compact SUV perfect for both city and highway driving.", null, null),
                new Vehicle(null, "Nissan", "Altima", "Mid Range", "Sedan", "/images/car.png", 4.1, "Automatic",
                        "Petrol", 5, true, 42.0, true, "Comfortable sedan with good fuel efficiency.", null, null),
                new Vehicle(null, "Volkswagen", "Jetta", "Mid Range", "Sedan", "/images/car.png", 4.4, "Automatic",
                        "Petrol", 5, true, 47.0, true, "German engineering with premium comfort.", null, null),
                new Vehicle(null, "Mazda", "CX-5", "Mid Range", "SUV", "/images/car.png", 4.5, "Automatic", "Petrol", 5,
                        true, 50.0, true, "Stylish SUV with excellent handling.", null, null),
                new Vehicle(null, "BMW", "X5", "Luxury", "SUV", "/images/car.png", 4.8, "Automatic", "Petrol", 7, true,
                        85.0, true, "Premium luxury SUV with outstanding performance.", null, null),
                new Vehicle(null, "Mercedes-Benz", "C-Class", "Luxury", "Sedan", "/images/car.png", 4.7, "Automatic",
                        "Petrol", 5, true, 80.0, true, "Luxury sedan with sophisticated features.", null, null),
                new Vehicle(null, "Audi", "A4", "Luxury", "Sedan", "/images/car.png", 4.6, "Automatic", "Petrol", 5,
                        true, 78.0, true, "Premium sedan with cutting-edge technology.", null, null),
                new Vehicle(null, "Tesla", "Model 3", "Luxury", "Sedan", "/images/car.png", 4.9, "Automatic",
                        "Electric", 5, true, 90.0, true, "Electric luxury sedan with autopilot features.", null, null),
                new Vehicle(null, "Jaguar", "XF", "Luxury", "Sedan", "/images/car.png", 4.5, "Automatic", "Petrol", 5,
                        true, 82.0, true, "British luxury with elegant design.", null, null),
                new Vehicle(null, "Lexus", "RX", "Luxury", "SUV", "/images/car.png", 4.7, "Automatic", "Hybrid", 5,
                        true, 88.0, true, "Luxury hybrid SUV with exceptional comfort.", null, null),
                new Vehicle(null, "Porsche", "Cayenne", "Luxury", "SUV", "/images/car.png", 4.8, "Automatic", "Petrol",
                        5, true, 95.0, true, "Sports SUV with incredible performance.", null, null),
                new Vehicle(null, "Land Rover", "Range Rover Evoque", "Luxury", "SUV", "/images/car.png", 4.6,
                        "Automatic", "Petrol", 5, true, 92.0, true, "Luxury compact SUV with off-road capabilities.",
                        null, null)
        };

        for (Vehicle vehicle : vehicles) {
            vehicleRepository.save(vehicle);
        }
    }
} */