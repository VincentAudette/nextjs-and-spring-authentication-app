package com.git619.auth.repository;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    Long countByUserAndSuccessAndAttemptTimeAfter(User user, Boolean success, Timestamp timestamp);

    Page<LoginAttempt> findByUser(User user, Pageable pageable);

    Page<LoginAttempt> findAllByUserOrderByAttemptTimeDesc(User user, Pageable pageable);

    // This method will return the earliest failed login attempt for a user
    LoginAttempt findTopByUserAndSuccessOrderByAttemptTimeAsc(User user, Boolean success);
}
