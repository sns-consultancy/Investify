package com.sns_consultancy.com.interior.app.Model;

import java.util.Date;

public class Vastu {

    private String userId;              // Identifier of the user
    private String roomType;            // Room type: Kitchen, Bedroom, etc.
    private String preferredDirection;  // Suggested vastu direction
    private Date timestamp;             // Timestamp for when vastu is logged/suggested

    // Getters and setters
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoomType() {
        return roomType;
    }
    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getPreferredDirection() {
        return preferredDirection;
    }
    public void setPreferredDirection(String preferredDirection) {
        this.preferredDirection = preferredDirection;
    }

    public Date getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Vastu{" +
                "userId='" + userId + '\'' +
                ", roomType='" + roomType + '\'' +
                ", preferredDirection='" + preferredDirection + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}