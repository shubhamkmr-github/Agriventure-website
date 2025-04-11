package com.web.agriventure.service;




import com.web.agriventure.model.Role;
import com.web.agriventure.model.User;
import com.web.agriventure.repositories.UserRepo;
import com.web.agriventure.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private JwtUtil jwtUtil;
    private final UserRepo UserRepo;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepo userRepo, AuthenticationManager authenticationManager) {
        UserRepo = userRepo;
        this.authenticationManager = authenticationManager;
    }


    public User registerUser(String name, String email, String password, Role role) {
        if (UserRepo.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return UserRepo.save(user);
    }


    public String verify(User user) {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtUtil.generateToken(authentication,user) ;
        }
        return "failed";
    }
}

