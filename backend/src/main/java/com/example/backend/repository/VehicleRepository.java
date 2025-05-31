package com.example.backend.repository;

import com.example.backend.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByAvailableTrue();

    List<Vehicle> findByBrandAndAvailableTrue(String brand);

    List<Vehicle> findByTypeAndAvailableTrue(String type);

    List<Vehicle> findByCategoryAndAvailableTrue(String category);

    @Query("SELECT DISTINCT v.brand FROM Vehicle v WHERE v.available = true ORDER BY v.brand")
    List<String> findDistinctBrands();

    @Query("SELECT DISTINCT v.type FROM Vehicle v WHERE v.available = true ORDER BY v.type")
    List<String> findDistinctTypes();

    @Query("SELECT DISTINCT v.category FROM Vehicle v WHERE v.available = true ORDER BY v.category")
    List<String> findDistinctCategories();

    @Query("SELECT v FROM Vehicle v WHERE " +
            "(:brand IS NULL OR v.brand = :brand) AND " +
            "(:type IS NULL OR v.type = :type) AND " +
            "(:category IS NULL OR v.category = :category) AND " +
            "(:minPrice IS NULL OR v.dailyPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR v.dailyPrice <= :maxPrice) AND " +
            "(:transmission IS NULL OR v.transmission = :transmission) AND " +
            "(:fuelType IS NULL OR v.fuelType = :fuelType) AND " +
            "v.available = true")
    Page<Vehicle> findVehiclesWithFilters(
            @Param("brand") String brand,
            @Param("type") String type,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("transmission") String transmission,
            @Param("fuelType") String fuelType,
            Pageable pageable);

    @Query("SELECT v FROM Vehicle v WHERE v.available = true AND " +
            "(LOWER(v.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(v.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(v.type) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Vehicle> searchVehicles(@Param("search") String search);
}
