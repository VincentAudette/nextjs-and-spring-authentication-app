package com.git619.auth.services;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import com.git619.auth.repository.LoginAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.sql.Timestamp;
import java.util.Date;

@Service
public class LoginAttemptService {
    private final Logger logger = LoggerFactory.getLogger(LoginAttemptService.class);

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    // limit the login attempts within the last hour
    private final long LOGIN_ATTEMPT_PERIOD = 60 * 60 * 1000;  // in milliseconds

    // Maximum login attempts before user gets blocked
    private final int MAX_LOGIN_ATTEMPTS = 5;


    public void createLoginAttempt(User user, Boolean success) {
        LoginAttempt loginAttempt = new LoginAttempt();
        loginAttempt.setUser(user);
        loginAttempt.setAttemptTime(new Timestamp(System.currentTimeMillis()));
        loginAttempt.setSuccess(success);
        loginAttemptRepository.save(loginAttempt);
        logger.info("Login attempt logged for user: {} Successful: {}", user.getUsername(), success);
    }

    public boolean hasExceededMaxAttempts(User user) {
        Timestamp oneHourAgo = new Timestamp(new Date().getTime() - LOGIN_ATTEMPT_PERIOD);
        Long count = loginAttemptRepository.countByUserAndSuccessAndAttemptTimeAfter(user, false, oneHourAgo);
        logger.info("User: {} has {} failed attempts in the last hour.", user.getUsername(), count);
        return count >= MAX_LOGIN_ATTEMPTS;
    }
}
