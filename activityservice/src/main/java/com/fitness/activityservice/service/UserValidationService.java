package com.fitness.activityservice.service;

import org.springframework.stereotype.Service;

@Service
public class UserValidationService {
    public boolean validateUser(String userId) {
        // Bypass for Demo Mode
        return true;
    }
}