package com.example.backend.repository;

import com.example.backend.model.Rental;
import com.example.backend.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    List<Rental> findByUserId(Long userId);

    List<Rental> findByVehicleId(Long vehicleId);

    @Query("SELECT r FROM Rental r WHERE r.vehicle = :vehicle AND " +
            "((r.startDate BETWEEN :startDate AND :endDate) OR " +
            "(r.endDate BETWEEN :startDate AND :endDate) OR " +
            "(r.startDate <= :startDate AND r.endDate >= :endDate))")
    List<Rental> findOverlappingRentals(@Param("vehicle") Vehicle vehicle,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    @Query("SELECT r FROM Rental r WHERE r.user.id = :userId AND r.endDate > CURRENT_TIMESTAMP ORDER BY r.startDate")
    List<Rental> findActiveRentalsByUser(@Param("userId") Long userId);
}