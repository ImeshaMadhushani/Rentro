package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // Low Budget, Mid Range, Luxury

    @Column(nullable = false)
    private String type; // Sedan, SUV, Hatchback

    @Column
    private String image;

    @Column
    private Double rating;

    @Column(nullable = false)
    private String transmission; // Manual, Automatic

    @Column(nullable = false)
    private String fuelType; // Petrol, Diesel, Electric, Hybrid

    @Column(nullable = false)
    private Integer seatingCapacity;

    @Column(nullable = false)
    private Boolean hasAC = true;

    @Column(nullable = false)
    private Double dailyPrice;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(length = 1000)
    private String description;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updatedAt = java.time.LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}