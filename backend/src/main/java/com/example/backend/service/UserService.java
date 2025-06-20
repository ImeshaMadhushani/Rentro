package com.example.backend.service;

import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(UserDTO userDTO) {
        // Check if email already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return "Email already registered";
        }

        // Set default role to CLIENT if not specified
        User.Role role = userDTO.getRole() != null ? userDTO.getRole() : User.Role.CLIENT;

        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(role);
        
        userRepository.save(user);

        return "User registered successfully";
    }

    public Optional<User> authenticateUser(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
                return userOptional;
            }
        }

        return Optional.empty();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public String updateUser(Long id, UserDTO userDTO) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Update fields if they are provided in the DTO
            if (userDTO.getFullName() != null) {
                user.setFullName(userDTO.getFullName());
            }
            if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
                // Check if new email is already taken
                if (userRepository.existsByEmail(userDTO.getEmail())) {
                    return "Email already in use by another user";
                }
                user.setEmail(userDTO.getEmail());
            }
            if (userDTO.getPhone() != null) {
                user.setPhone(userDTO.getPhone());
            }
            if (userDTO.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }
            if (userDTO.getRole() != null) {
                user.setRole(userDTO.getRole());
            }
            
            userRepository.save(user);
            return "User updated successfully";
        }
        return "User not found";
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Long getUserIdByEmail(String email) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isPresent()) {
        return userOpt.get().getId();
    } else {
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}

}
