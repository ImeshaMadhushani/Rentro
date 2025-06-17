package com.example.backend.service;

import com.example.backend.dto.CreateRentalDTO;
import com.example.backend.dto.RentalDTO;
import com.example.backend.dto.RentalResponseDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.VehicleNotAvailableException;
import com.example.backend.model.Rental;
import com.example.backend.model.User;
import com.example.backend.model.Vehicle;
import com.example.backend.repository.RentalRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RentalResponseDTO createRental(CreateRentalDTO createRentalDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(createRentalDTO.getVehicleId())
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        // Check vehicle availability
        if (!vehicle.getAvailable()) {
            throw new VehicleNotAvailableException("Vehicle is not available for rental");
        }

        // Check for overlapping rentals
        List<Rental> overlappingRentals = rentalRepository.findOverlappingRentals(
                vehicle,
                createRentalDTO.getStartDate(),
                createRentalDTO.getEndDate());

        if (!overlappingRentals.isEmpty()) {
            throw new VehicleNotAvailableException("Vehicle is already booked for the selected dates");
        }

        // Calculate total price
        long days = ChronoUnit.DAYS.between(createRentalDTO.getStartDate(), createRentalDTO.getEndDate());
        double totalPrice = days * vehicle.getDailyPrice();

        // Create and save rental
        Rental rental = new Rental();
        rental.setUser(user);
        rental.setVehicle(vehicle);
        rental.setStartDate(createRentalDTO.getStartDate());
        rental.setEndDate(createRentalDTO.getEndDate());
        rental.setTotalPrice(totalPrice);
        rental.setPaymentMethod(Rental.PaymentMethod.valueOf(createRentalDTO.getPaymentMethod()));
        rental.setPaymentDetails(createRentalDTO.getPaymentDetails());
        rental.setStatus(Rental.RentalStatus.CONFIRMED);

        Rental savedRental = rentalRepository.save(rental);

        return convertToResponseDTO(savedRental);
    }

    public List<RentalResponseDTO> getUserRentals(Long userId) {
        return rentalRepository.findByUserId(userId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<RentalResponseDTO> getVehicleRentals(Long vehicleId) {
        return rentalRepository.findByVehicleId(vehicleId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public RentalResponseDTO getRentalById(Long rentalId) {
        return rentalRepository.findById(rentalId)
                .map(this::convertToResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found"));
    }

    @Transactional
    public RentalResponseDTO cancelRental(Long rentalId, Long userId) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found"));

        if (!rental.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("User is not authorized to cancel this rental");
        }

        if (rental.getStatus() != Rental.RentalStatus.CONFIRMED) {
            throw new IllegalStateException("Only confirmed rentals can be cancelled");
        }

        if (rental.getStartDate().isBefore(LocalDateTime.now().plusHours(24))) {
            throw new IllegalStateException("Rental cannot be cancelled less than 24 hours before start");
        }

        rental.setStatus(Rental.RentalStatus.CANCELLED);
        Rental updatedRental = rentalRepository.save(rental);

        return convertToResponseDTO(updatedRental);
    }

    public List<RentalResponseDTO> getActiveRentals(Long userId) {
        return rentalRepository.findActiveRentalsByUser(userId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    private RentalResponseDTO convertToResponseDTO(Rental rental) {
        RentalResponseDTO dto = new RentalResponseDTO();
        dto.setId(rental.getId());
        dto.setUserFullName(rental.getUser().getFullName());
        dto.setUserEmail(rental.getUser().getEmail());
        dto.setVehicleBrand(rental.getVehicle().getBrand());
        dto.setVehicleName(rental.getVehicle().getName());
        dto.setStartDate(rental.getStartDate().toString());
        dto.setEndDate(rental.getEndDate().toString());
        dto.setTotalPrice(rental.getTotalPrice());
        dto.setPaymentMethod(rental.getPaymentMethod().toString());
        dto.setStatus(rental.getStatus().toString());
        return dto;
    }
}