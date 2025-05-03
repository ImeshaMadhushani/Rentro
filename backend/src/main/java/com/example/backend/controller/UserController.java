package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow React to access this
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

User user = new User();
    user.setFullName(userDTO.getFullName());
    user.setEmail(userDTO.getEmail());
    user.setPhone(userDTO.getPhone());
    user.setPassword(userDTO.getPassword());
    userRepository.save(user);

        if (user.getFullName() == null || user.getEmail() == null || user.getPhone() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("All fields are required.");
        }

        if (user.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters long.");
}


        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
}
