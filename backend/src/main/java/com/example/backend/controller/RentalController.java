package com.example.backend.controller;

import com.example.backend.dto.RentalDTO;
import com.example.backend.dto.RentalRequestDTO;
import com.example.backend.dto.RentalStatusUpdateDTO;
import com.example.backend.service.RentalService;
import com.example.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @Autowired
    private UserService userService; 

    @PostMapping
    public ResponseEntity<RentalDTO> createRental(
            @RequestBody RentalRequestDTO rentalRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();
        Long userId = userService.getUserIdByEmail(email);
        RentalDTO rentalDTO = rentalService.createRental(rentalRequestDTO, userId);
        return ResponseEntity.ok(rentalDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable Long id) {
        RentalDTO rentalDTO = rentalService.getRentalById(id);
        return ResponseEntity.ok(rentalDTO);
    }

    @GetMapping("/user")
    public ResponseEntity<List<RentalDTO>> getRentalsByUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserIdByEmail(email);
        List<RentalDTO> rentals = rentalService.getRentalsByUser(userId);
        return ResponseEntity.ok(rentals);
    }

    @GetMapping
    public ResponseEntity<Page<RentalDTO>> getAllRentals(Pageable pageable) {
        Page<RentalDTO> rentals = rentalService.getAllRentals(pageable);
        return ResponseEntity.ok(rentals);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<RentalDTO>> getRentalsWithFilters(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate returnDate,
            Pageable pageable) {
        Page<RentalDTO> rentals = rentalService.getRentalsWithFilters(
                userId, vehicleId, status, startDate, returnDate, pageable);
        return ResponseEntity.ok(rentals);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RentalDTO> updateRentalStatus(
            @PathVariable Long id,
            @RequestBody RentalStatusUpdateDTO statusUpdateDTO) {
        RentalDTO rentalDTO = rentalService.updateRentalStatus(id, statusUpdateDTO);
        return ResponseEntity.ok(rentalDTO);
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelRental(@PathVariable Long id) {
        rentalService.cancelRental(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats/user/{userId}")
    public ResponseEntity<Long> countRentalsByUser(@PathVariable Long userId) {
        long count = rentalService.countRentalsByUser(userId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/vehicle/{vehicleId}")
    public ResponseEntity<Long> countRentalsByVehicle(@PathVariable Long vehicleId) {
        long count = rentalService.countRentalsByVehicle(vehicleId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/status/{status}")
    public ResponseEntity<Long> countRentalsByStatus(@PathVariable String status) {
        long count = rentalService.countRentalsByStatus(status);
        return ResponseEntity.ok(count);
    }
}