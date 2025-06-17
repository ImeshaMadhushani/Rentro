package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RentalResponseDTO {
    private Long id;
    private String userFullName;
    private String userEmail;
    private String vehicleBrand;
    private String vehicleName;
    private String startDate;
    private String endDate;
    private Double totalPrice;
    private String paymentMethod;
    private String status;
}