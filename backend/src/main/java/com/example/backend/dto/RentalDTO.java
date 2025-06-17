package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RentalDTO {
    private Long id;
    private Long userId;
    private Long vehicleId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Double totalPrice;
    private String paymentMethod;
    private String paymentDetails;
    private String status;
}