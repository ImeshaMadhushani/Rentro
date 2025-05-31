package com.example.backend.controller;

import com.example.backend.dto.JwtResponse;
import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        String result = userService.registerUser(userDTO);

        if (result.equals("Email already registered")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        Optional<User> userOptional = userService.authenticateUser(loginDTO);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String token = jwtUtil.generateToken(user);

            JwtResponse jwtResponse = new JwtResponse(
                    token,
                    user.getId(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRole().toString());

            return ResponseEntity.ok(jwtResponse);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }
}
