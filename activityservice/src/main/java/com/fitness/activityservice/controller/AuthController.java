package com.fitness.activityservice.controller;

import com.fitness.activityservice.model.User;
import com.fitness.activityservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        // 1. Check karo ke kya ye user pehle se database mein hai?
        Optional<User> userOptional = userRepository.findById(loginUser.getUsername());

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            // 2. Agar user mil gaya, toh password match karo
            if (existingUser.getPassword().equals(loginUser.getPassword())) {
                return ResponseEntity.ok(existingUser); // Sahi password
            } else {
                return ResponseEntity.status(401).body("Ghalat Password! Dubara try karein."); // Galat password
            }
        } else {
            // 3. Agar user nahi mila, toh naya account bana lo (First time login)
            User savedUser = userRepository.save(loginUser);
            return ResponseEntity.ok(savedUser);
        }
    }
}