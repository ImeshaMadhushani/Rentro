package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String fullName;
    private String email;

    public JwtResponse(String token, Long id, String fullName, String email) {
        this.token = token;
        this.id = id;
        this.fullName = fullName;
        this.email = email;
    }
}
