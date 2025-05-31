package com.example.backend.dto;

import com.example.backend.model.User.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private Role role;
}