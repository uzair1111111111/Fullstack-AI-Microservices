package com.fitness.aiservice.model;

import jakarta.persistence.*; // Ye SQL/H2 ke liye zaroori hai
import lombok.*;
import java.time.LocalDateTime;

@Entity // @Document ki jagah ye use hoga
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String activityId;
    private String recommendationText;
    private LocalDateTime createdAt;
}