package com.fitness.aiservice.controller;

import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.service.RecommendationService;
import com.fitness.aiservice.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Frontend connectivity ke liye
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final GeminiService geminiService; // AI service inject kar di

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> getUserRecommendations(@PathVariable String userId) {
        // 1. Pehle database check karo
        List<Recommendation> list = recommendationService.getRecommendationsByUserId(userId);

        // 2. Agar database khali hai, toh Gemini AI se mashwara lo
        if (list.isEmpty()) {
            // AI ko prompt bhejo
            String aiAdvice = geminiService.getRecommendations("Provide a short, motivating fitness tip for " + userId);

            // Temporary Recommendation object banao
            Recommendation rec = new Recommendation();
            rec.setUserId(userId);
            rec.setRecommendationText(aiAdvice);

            return ResponseEntity.ok(List.of(rec));
        }

        return ResponseEntity.ok(list);
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Recommendation> getActivityRecommendation(@PathVariable String activityId) {
        return ResponseEntity.ok(recommendationService.getRecommendationByActivityId(activityId));
    }
}