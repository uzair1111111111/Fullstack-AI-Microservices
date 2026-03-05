package com.fitness.activityservice.repository;

import com.fitness.activityservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Ye String is liye hai kyunke hamari ID 'username' hai jo ke String hai
}