package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentalRequestDTO {
    private Long vehicleId;
    private String pickupLocation;
    private String dropoffLocation;
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private String paymentMethod;
}
