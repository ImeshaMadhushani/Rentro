package com.example.backend.service;

import com.example.backend.dto.VehicleDTO;
import com.example.backend.dto.VehicleFilterDTO;
import com.example.backend.model.Vehicle;
import com.example.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<VehicleDTO> getAllAvailableVehicles() {
        return vehicleRepository.findByAvailableTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<VehicleDTO> getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .map(this::convertToDTO);
    }

    public Page<VehicleDTO> getVehiclesWithFilters(VehicleFilterDTO filterDTO) {
        Sort sort = Sort.by(
                "DESC".equalsIgnoreCase(filterDTO.getSortDirection())
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC,
                filterDTO.getSortBy());

        Pageable pageable = PageRequest.of(
                filterDTO.getPage(),
                filterDTO.getSize(),
                sort);

        Page<Vehicle> vehicles = vehicleRepository.findVehiclesWithFilters(
                filterDTO.getBrand(),
                filterDTO.getType(),
                filterDTO.getCategory(),
                filterDTO.getMinPrice(),
                filterDTO.getMaxPrice(),
                filterDTO.getTransmission(),
                filterDTO.getFuelType(),
                pageable);

        return vehicles.map(this::convertToDTO);
    }

    public List<VehicleDTO> getVehiclesByBrand(String brand) {
        return vehicleRepository.findByBrandAndAvailableTrue(brand)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VehicleDTO> getVehiclesByType(String type) {
        return vehicleRepository.findByTypeAndAvailableTrue(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VehicleDTO> getVehiclesByCategory(String category) {
        return vehicleRepository.findByCategoryAndAvailableTrue(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllBrands() {
        return vehicleRepository.findDistinctBrands();
    }

    public List<String> getAllTypes() {
        return vehicleRepository.findDistinctTypes();
    }

    public List<String> getAllCategories() {
        return vehicleRepository.findDistinctCategories();
    }

    public List<VehicleDTO> searchVehicles(String searchTerm) {
        return vehicleRepository.searchVehicles(searchTerm)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VehicleDTO addVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = convertToEntity(vehicleDTO);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return convertToDTO(savedVehicle);
    }

    public Optional<VehicleDTO> updateVehicle(Long id, VehicleDTO vehicleDTO) {
        return vehicleRepository.findById(id)
                .map(existingVehicle -> {
                    updateVehicleFromDTO(existingVehicle, vehicleDTO);
                    Vehicle savedVehicle = vehicleRepository.save(existingVehicle);
                    return convertToDTO(savedVehicle);
                });
    }

    public boolean deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updateVehicleAvailability(Long id, boolean available) {
        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    vehicle.setAvailable(available);
                    vehicleRepository.save(vehicle);
                    return true;
                })
                .orElse(false);
    }

    // Helper methods
    private VehicleDTO convertToDTO(Vehicle vehicle) {
        VehicleDTO dto = new VehicleDTO();
        dto.setBrand(vehicle.getBrand());
        dto.setName(vehicle.getName());
        dto.setCategory(vehicle.getCategory());
        dto.setType(vehicle.getType());
        dto.setImage(vehicle.getImage());
        dto.setRating(vehicle.getRating());
        dto.setTransmission(vehicle.getTransmission());
        dto.setFuelType(vehicle.getFuelType());
        dto.setSeatingCapacity(vehicle.getSeatingCapacity());
        dto.setHasAC(vehicle.getHasAC());
        dto.setDailyPrice(vehicle.getDailyPrice());
        dto.setAvailable(vehicle.getAvailable());
        dto.setDescription(vehicle.getDescription());
        return dto;
    }

    private Vehicle convertToEntity(VehicleDTO dto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setBrand(dto.getBrand());
        vehicle.setName(dto.getName());
        vehicle.setCategory(dto.getCategory());
        vehicle.setType(dto.getType());
        vehicle.setImage(dto.getImage());
        vehicle.setRating(dto.getRating());
        vehicle.setTransmission(dto.getTransmission());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setSeatingCapacity(dto.getSeatingCapacity());
        vehicle.setHasAC(dto.getHasAC());
        vehicle.setDailyPrice(dto.getDailyPrice());
        vehicle.setAvailable(dto.getAvailable());
        vehicle.setDescription(dto.getDescription());
        return vehicle;
    }

    private void updateVehicleFromDTO(Vehicle vehicle, VehicleDTO dto) {
        if (dto.getBrand() != null)
            vehicle.setBrand(dto.getBrand());
        if (dto.getName() != null)
            vehicle.setName(dto.getName());
        if (dto.getCategory() != null)
            vehicle.setCategory(dto.getCategory());
        if (dto.getType() != null)
            vehicle.setType(dto.getType());
        if (dto.getImage() != null)
            vehicle.setImage(dto.getImage());
        if (dto.getRating() != null)
            vehicle.setRating(dto.getRating());
        if (dto.getTransmission() != null)
            vehicle.setTransmission(dto.getTransmission());
        if (dto.getFuelType() != null)
            vehicle.setFuelType(dto.getFuelType());
        if (dto.getSeatingCapacity() != null)
            vehicle.setSeatingCapacity(dto.getSeatingCapacity());
        if (dto.getHasAC() != null)
            vehicle.setHasAC(dto.getHasAC());
        if (dto.getDailyPrice() != null)
            vehicle.setDailyPrice(dto.getDailyPrice());
        if (dto.getAvailable() != null)
            vehicle.setAvailable(dto.getAvailable());
        if (dto.getDescription() != null)
            vehicle.setDescription(dto.getDescription());
    }
}
