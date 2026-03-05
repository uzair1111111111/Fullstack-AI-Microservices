package com.fitness.activityservice.controller;

import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.service.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<Activity> trackActivity(
            @RequestBody Activity activity,
            @RequestHeader(value = "X-User-ID") String userId) { // Default value hata di
        activity.setUserId(userId);
        return ResponseEntity.ok(activityService.saveActivity(activity));
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getUserActivities(
            @RequestHeader(value = "X-User-ID") String userId) { // Ab ye header zaroori hai
        return ResponseEntity.ok(activityService.getActivitiesByUserId(userId));
    }
}