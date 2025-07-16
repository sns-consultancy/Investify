package com.sns_consultancy.com.interior.app.Request;

public class Login {
    private String userId;      // Unique ID of the user attempting login
    private String password;    // Should be hashed or securely validated during login

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

