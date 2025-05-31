package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private String brand;
    private String name;
    private String category;
    private String type;
    private String image;
    private Double rating;
    private String transmission;
    private String fuelType;
    private Integer seatingCapacity;
    private Boolean hasAC;
    private Double dailyPrice;
    private Boolean available;
    private String description;
}
