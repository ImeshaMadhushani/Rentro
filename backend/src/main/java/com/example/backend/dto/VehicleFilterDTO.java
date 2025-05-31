package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleFilterDTO {
    private String brand;
    private String type;
    private String category;
    private Double minPrice;
    private Double maxPrice;
    private String transmission;
    private String fuelType;
    private Integer page = 0;
    private Integer size = 20;
    private String sortBy = "brand";
    private String sortDirection = "ASC";
}