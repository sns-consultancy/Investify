package com.sns_consultancy.com.interior.app.Service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.sns_consultancy.com.interior.app.Request.User;

@Service
public class UserService {

    private final BCryptPasswordEncoder passwordEncoder;

    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String registerUser(User newUser) {
        System.out.println("Registering user: " + newUser);

        if (newUser.getEmail() == null || newUser.getName() == null || newUser.getPassword() == null) {
            throw new IllegalArgumentException("Missing required fields: name, email, or password.");
        }

        String hashedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashedPassword);

        boolean userSaved = saveUserToDatabase(newUser);

        if (userSaved) {
            return "User registered successfully with username: " + newUser.getName();
        } else {
            throw new RuntimeException("Failed to register the user. Please try again.");
        }
    }

    private boolean saveUserToDatabase(User newUser) {
        System.out.println("Saving user to the database: " + newUser);
        return true;
    }
}