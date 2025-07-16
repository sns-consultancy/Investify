package com.sns_consultancy.com.interior.app.Controller;

import com.sns_consultancy.com.interior.app.Request.User;


import com.sns_consultancy.com.interior.app.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.sns_consultancy.com.interior.app.Request.User;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User newUser) {
        String result = userService.registerUser(newUser);
        return ResponseEntity.ok(result);
    }
}