package com.example.backend.repository;

import com.example.backend.model.Rental;
import com.example.backend.model.User;
import com.example.backend.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {

    List<Rental> findByUserId(Long userId);

    List<Rental> findByVehicleId(Long vehicleId);

    List<Rental> findByStatus(String status);

    Page<Rental> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT r FROM Rental r WHERE " +
            "(:userId IS NULL OR r.user.id = :userId) AND " +
            "(:vehicleId IS NULL OR r.vehicle.id = :vehicleId) AND " +
            "(:status IS NULL OR r.status = :status) AND " +
            "(:startDate IS NULL OR r.pickupDate >= :startDate) AND " +
            "(:endDate IS NULL OR r.returnDate <= :endDate)")
    Page<Rental> findWithFilters(
            @Param("userId") Long userId,
            @Param("vehicleId") Long vehicleId,
            @Param("status") String status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    @Query("SELECT r FROM Rental r WHERE " +
            "r.vehicle.id = :vehicleId AND " +
            "((r.pickupDate BETWEEN :pickupDate AND :returnDate) OR " +
            "(r.returnDate BETWEEN :pickupDate AND :returnDate) OR " +
            "(r.pickupDate <= :pickupDate AND r.returnDate >= :returnDate)) AND " +
            "r.status NOT IN ('CANCELLED', 'COMPLETED')")
    List<Rental> findOverlappingRentals(
            @Param("vehicleId") Long vehicleId,
            @Param("pickupDate") LocalDate pickupDate,
            @Param("returnDate") LocalDate returnDate);

    long countByUser(User user);

    long countByVehicle(Vehicle vehicle);

    long countByStatus(String status);
}