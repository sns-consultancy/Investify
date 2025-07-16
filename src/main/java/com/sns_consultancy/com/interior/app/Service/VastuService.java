package com.sns_consultancy.com.interior.app.Service;

import com.sns_consultancy.com.interior.app.Model.Vastu;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class VastuService {

    // In-memory list to simulate database
    private final List<Vastu> vastuList = new ArrayList<>();

    // Get all vastu records
    public List<Vastu> getAllVastu() throws ExecutionException, InterruptedException {
        return new ArrayList<>(vastuList);
    }

    // Save or update vastu record for a user
    public String saveVastu(Vastu vastuItem, String input) throws ExecutionException, InterruptedException {
        // Remove existing vastu for same user and roomType
        vastuList.removeIf(v -> v.getUserId().equals(vastuItem.getUserId()) && v.getRoomType().equals(vastuItem.getRoomType()));
        vastuList.add(vastuItem);
        return "Vastu record saved for user: " + vastuItem.getUserId() + ", room: " + vastuItem.getRoomType();
    }

    // Get vastu record for a user and specific room type
    public Vastu getVastu(String userId, String roomType) throws ExecutionException, InterruptedException {
        return vastuList.stream()
                .filter(v -> v.getUserId().equals(userId) && v.getRoomType().equals(roomType))
                .findFirst()
                .orElse(null);
    }

    // Delete vastu record for a user and room type
    public String deleteVastu(String userId, String roomType) throws ExecutionException, InterruptedException {
        boolean removed = vastuList.removeIf(v -> v.getUserId().equals(userId) && v.getRoomType().equals(roomType));
        if (removed) {
            return "Vastu record deleted for user: " + userId + ", room: " + roomType;
        } else {
            return "No vastu record found for user: " + userId + ", room: " + roomType;
        }
    }
}