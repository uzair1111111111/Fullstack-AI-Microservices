package com.fitness.aiservice.respository;

import com.fitness.aiservice.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository; // Mongo ki jagah Jpa
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByUserId(String userId);
}