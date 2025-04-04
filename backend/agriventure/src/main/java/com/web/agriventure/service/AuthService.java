package com.web.agriventure.service;




import com.web.agriventure.model.Role;
import com.web.agriventure.model.User;
import com.web.agriventure.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    UserRepo UserRepo;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);

//    public AuthService(UserRepo UserRepo, BCryptPasswordEncoder passwordEncoder) {
//        this.UserRepo = UserRepo;
//        this.passwordEncoder = passwordEncoder;
//    }

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

    public Optional<User> authenticate(String email, String rawPassword) {
        Optional<User> user = UserRepo.findByEmail(email);
        return user.filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }
}

