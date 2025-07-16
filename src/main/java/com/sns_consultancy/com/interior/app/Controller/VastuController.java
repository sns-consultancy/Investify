package com.sns_consultancy.com.interior.app.Controller;

import com.sns_consultancy.com.interior.app.Model.Vastu;
import com.sns_consultancy.com.interior.app.Service.VastuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/vastu")
public class VastuController {

    @Autowired
    private VastuService vastuService;

    // Get all vastu records for all users
    @GetMapping
    public List<Vastu> getAllVastu() throws ExecutionException, InterruptedException {
        return vastuService.getAllVastu();
    }

    // Create or update vastu record for a user
    @PostMapping
    public String createOrUpdateVastu(@RequestBody Vastu vastuItem) throws ExecutionException, InterruptedException {
        return vastuService.saveVastu(vastuItem, "default input");
    }

    // Get vastu record for a user and specific room type
    @GetMapping("/{userId}/{roomType}")
    public Vastu getVastu(@PathVariable String userId, @PathVariable String roomType) throws ExecutionException, InterruptedException {
        return vastuService.getVastu(userId, roomType);
    }

    // Delete vastu record for a user and room type
    @DeleteMapping("/{userId}/{roomType}")
    public String deleteVastu(@PathVariable String userId, @PathVariable String roomType) throws ExecutionException, InterruptedException {
        return vastuService.deleteVastu(userId, roomType);
    }
}