package com.example.backend.service;

import com.example.backend.dto.RentalDTO;
import com.example.backend.dto.RentalRequestDTO;
import com.example.backend.dto.RentalStatusUpdateDTO;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.VehicleNotAvailableException;
import com.example.backend.model.Rental;
import com.example.backend.model.User;
import com.example.backend.model.Vehicle;
import com.example.backend.model.Rental.RentalStatus;
import com.example.backend.repository.RentalRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
//import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Transactional
    public RentalDTO createRental(RentalRequestDTO rentalRequestDTO, Long userId) {

        if (rentalRequestDTO.getPickupDate().isAfter(rentalRequestDTO.getReturnDate())) {
            throw new IllegalArgumentException("Return date must be after pickup date");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Vehicle vehicle = vehicleRepository.findById(rentalRequestDTO.getVehicleId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Vehicle not found with id: " + rentalRequestDTO.getVehicleId()));

        // Check vehicle availability for the requested dates
        // Check vehicle availability
        if (!isVehicleAvailable(rentalRequestDTO.getVehicleId(),
                rentalRequestDTO.getPickupDate(),
                rentalRequestDTO.getReturnDate())) {
            throw new VehicleNotAvailableException("Vehicle is not available for the selected dates");
        }

        // Calculate rental days and total amount
        long rentalDays = ChronoUnit.DAYS.between(
                rentalRequestDTO.getPickupDate(),
                rentalRequestDTO.getReturnDate()) + 1;// Include both start and end days

        double totalAmount = rentalDays * vehicle.getDailyPrice();

        Rental rental = new Rental();
        rental.setUser(user);
        rental.setVehicle(vehicle);
        rental.setPickupLocation(rentalRequestDTO.getPickupLocation());
        rental.setDropoffLocation(rentalRequestDTO.getDropoffLocation());
        rental.setPickupDate(rentalRequestDTO.getPickupDate());
        rental.setReturnDate(rentalRequestDTO.getReturnDate());
        rental.setTotalAmount(totalAmount);
        rental.setRentalDays((int) rentalDays);
        rental.setStatus(RentalStatus.PENDING);
        rental.setPaymentMethod(rentalRequestDTO.getPaymentMethod());

        Rental savedRental = rentalRepository.save(rental);
        return convertToDTO(savedRental);
    }
    
    private boolean isVehicleAvailable(Long vehicleId, LocalDate pickupDate, LocalDate returnDate) {
        List<Rental> overlappingRentals = rentalRepository.findOverlappingRentals(
                vehicleId,
                pickupDate,
                returnDate);
        return overlappingRentals.isEmpty();
    }

    public RentalDTO getRentalById(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: " + id));
        return convertToDTO(rental);
    }



    public List<RentalDTO> getRentalsByUser(Long userId) {
        return rentalRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RentalDTO> getRentalsByVehicle(Long vehicleId) {
        return rentalRepository.findByVehicleId(vehicleId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Page<RentalDTO> getAllRentals(Pageable pageable) {
        return rentalRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public Page<RentalDTO> getRentalsWithFilters(
            Long userId,
            Long vehicleId,
            String status,
            LocalDate startDate,
            LocalDate endDate,
            Pageable pageable) {
        return rentalRepository.findWithFilters(
                userId,
                vehicleId,
                status,
                startDate,
                endDate,
                pageable)
                .map(this::convertToDTO);
    }

    @Transactional
    public RentalDTO updateRentalStatus(Long id, RentalStatusUpdateDTO statusUpdateDTO) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: " + id));

        // Validate status transition
        RentalStatus currentStatus = rental.getStatus();
        RentalStatus newStatus;
        try {
            newStatus = RentalStatus.valueOf(statusUpdateDTO.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + statusUpdateDTO.getStatus());
        }

        if (!isValidStatusTransition(currentStatus, newStatus)) {
            throw new IllegalArgumentException("Invalid status transition from " + currentStatus + " to " + newStatus);
        }

        // Special handling for CONFIRMED status
        if (newStatus == RentalStatus.CONFIRMED) {
            if (statusUpdateDTO.getPaymentReference() == null || statusUpdateDTO.getPaymentReference().isEmpty()) {
                throw new IllegalArgumentException("Payment reference is required for confirming a rental");
            }
            rental.setPaymentReference(statusUpdateDTO.getPaymentReference());
        }

        // Update the status
        rental.setStatus(newStatus);

        Rental updatedRental = rentalRepository.save(rental);
        return convertToDTO(updatedRental);
    }

    @Transactional
    public void cancelRental(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found with id: " + id));

        RentalStatus currentStatus = rental.getStatus();
        if (currentStatus == RentalStatus.COMPLETED || currentStatus == RentalStatus.CANCELLED) {
            throw new IllegalStateException("Cannot cancel a rental that is already " + currentStatus);
        }

        rental.setStatus(RentalStatus.CANCELLED);
        rentalRepository.save(rental);
    }

    public long countRentalsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return rentalRepository.countByUser(user);
    }

    public long countRentalsByVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + vehicleId));
        return rentalRepository.countByVehicle(vehicle);
    }

    public long countRentalsByStatus(String status) {
        return rentalRepository.countByStatus(status);
    }

    // Helper methods
    private RentalDTO convertToDTO(Rental rental) {
        RentalDTO dto = new RentalDTO();
        dto.setId(rental.getId());
        dto.setUserId(rental.getUser().getId());
        dto.setVehicleId(rental.getVehicle().getId());
        dto.setPickupLocation(rental.getPickupLocation());
        dto.setDropoffLocation(rental.getDropoffLocation());
        dto.setPickupDate(rental.getPickupDate());
        dto.setReturnDate(rental.getReturnDate());
        dto.setTotalAmount(rental.getTotalAmount());
        dto.setRentalDays(rental.getRentalDays());
        dto.setStatus(rental.getStatus().toString());
        dto.setPaymentMethod(rental.getPaymentMethod());
        dto.setPaymentReference(rental.getPaymentReference());
        dto.setCreatedAt(rental.getCreatedAt());
        dto.setUpdatedAt(rental.getUpdatedAt());
        return dto;
    }

    private boolean isValidStatusTransition(RentalStatus currentStatus, RentalStatus newStatus) {
        // Define valid status transitions
        switch (currentStatus) {
            case PENDING:
                return newStatus == RentalStatus.CONFIRMED || newStatus == RentalStatus.CANCELLED;
            case CONFIRMED:
                return newStatus == RentalStatus.IN_PROGRESS || newStatus == RentalStatus.CANCELLED;
            case IN_PROGRESS:
                return newStatus == RentalStatus.COMPLETED;
            case COMPLETED:
            case CANCELLED:
                return false; // Final states
            default:
                throw new IllegalArgumentException("Unknown status: " + currentStatus);
        }
    }
}