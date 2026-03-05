
package com.fitness.activityservice.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ActivityResponse {
    private Long id; // SQL ke mutabiq Long
    private String userId;
    private String type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
}