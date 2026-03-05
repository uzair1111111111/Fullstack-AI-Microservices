package com.fitness.aiservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // String ki jagah ActivityType enum use karein
    @Enumerated(EnumType.STRING)
    private ActivityType type;

    private int duration;
}