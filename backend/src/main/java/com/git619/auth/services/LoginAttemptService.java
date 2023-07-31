package com.git619.auth.services;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import com.git619.auth.repository.LoginAttemptRepository;
import com.git619.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;


@Service
public class LoginAttemptService {
    private final Logger logger = LoggerFactory.getLogger(LoginAttemptService.class);
    private final UserRepository userRepository;

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    // limit the login attempts within the last hour
    private final long LOGIN_ATTEMPT_PERIOD = 60 * 60 * 1000;  // in milliseconds

    // Maximum login attempts before user gets blocked
    private final int MAX_LOGIN_ATTEMPTS = 5;

    @Autowired
    public LoginAttemptService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createLoginAttempt(User user, Boolean success) {
        LoginAttempt loginAttempt = new LoginAttempt();
        loginAttempt.setUser(user);
        loginAttempt.setAttemptTime(new Timestamp(System.currentTimeMillis()));
        loginAttempt.setSuccess(success);

        // Check if user has exceeded max attempts after this login attempt
        if (!success) {
            boolean hasExceeded = hasExceededMaxAttempts(user);
            loginAttempt.setUserLocked(hasExceeded);
            if (hasExceeded) {
                user.setAccountNonLocked(false);
                user.setAccountLockCount(user.getAccountLockCount() + 1);
                logger.warn("User: {} has been locked due to exceeding max attempts. Total locks: {}",
                        user.getUsername(), user.getAccountLockCount());

                if (user.getAccountLockCount() >= 3) {
                    user.setEnabled(false);
                    logger.warn("User: {} has been disabled due to exceeding lock count limit.", user.getUsername());
                }

                userRepository.save(user);
            }
        } else {
            loginAttempt.setUserLocked(false);
            user.setAccountNonLocked(true);
            user.setAccountLockCount(0);
            user.setEnabled(true);
            userRepository.save(user);
        }

        loginAttemptRepository.save(loginAttempt);
        logger.info("Login attempt logged for user: {} Successful: {}", user.getUsername(), success);
    }



    public boolean hasExceededMaxAttempts(User user) {
        Timestamp oneHourAgo = new Timestamp(new Date().getTime() - LOGIN_ATTEMPT_PERIOD);
        Long count = loginAttemptRepository.countByUserAndSuccessAndAttemptTimeAfter(user, false, oneHourAgo);
        logger.info("User: {} has {} failed attempts in the last hour.", user.getUsername(), count);
        return count >= MAX_LOGIN_ATTEMPTS;
    }

    public ZonedDateTime getTimeToRetry(User user) {
        ZonedDateTime oneHourAgo = ZonedDateTime.now(ZoneId.of("America/Montreal")).minusHours(1);
        LoginAttempt earliestFailedAttempt = loginAttemptRepository.findTopByUserAndSuccessOrderByAttemptTimeAsc(user, false);

        if (earliestFailedAttempt == null) {
            return null;
        }

        // Converting Timestamp to ZonedDateTime
        ZonedDateTime earliestFailedAttemptTime = earliestFailedAttempt.getAttemptTime().toInstant().atZone(ZoneId.of("America/Montreal"));

        // Calculating when the earliest failed attempt will expire
        ZonedDateTime timeToRetry = earliestFailedAttemptTime.plus(LOGIN_ATTEMPT_PERIOD, ChronoUnit.MILLIS);

        return timeToRetry;
    }


}

