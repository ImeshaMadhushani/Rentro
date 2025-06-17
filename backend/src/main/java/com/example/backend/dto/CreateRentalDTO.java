package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreateRentalDTO {
    private Long vehicleId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String paymentMethod;
    private String paymentDetails;
}