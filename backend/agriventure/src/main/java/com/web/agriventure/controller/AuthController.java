package com.web.agriventure.controller;



import com.web.agriventure.DTO.JwtResponse;
import com.web.agriventure.DTO.LoginRequest;
import com.web.agriventure.model.Role;
import com.web.agriventure.model.User;
import com.web.agriventure.security.JwtUtil;
import com.web.agriventure.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = authService.registerUser(user.getName(), user.getEmail(), user.getPassword(), Role.USER);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.verify(user);
    }

}

