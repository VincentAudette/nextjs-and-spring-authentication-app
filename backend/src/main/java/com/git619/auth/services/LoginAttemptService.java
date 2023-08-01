package com.git619.auth.services;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import com.git619.auth.repository.LoginAttemptRepository;
import com.git619.auth.repository.UserRepository;
import com.git619.auth.utils.LoginAttemptState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;


import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;


@Service
public class LoginAttemptService {
    private final Logger logger = LoggerFactory.getLogger(LoginAttemptService.class);
    private final UserRepository userRepository;

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    // FIXME: Changer le momntant pour le bon nombre de temps
    // L'utilisateur peut avoir 5 essaies aux 20 minutes.
    private final long LOGIN_ATTEMPT_PERIOD = 20 * 60 * 1000;  // in milliseconds

    // Le nombre de tentatives maximale
    private final int MAX_LOGIN_ATTEMPTS = 5;

    @Autowired
    public LoginAttemptService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createLoginAttempt(User user, Boolean success) {
        LoginAttempt loginAttempt = new LoginAttempt();
        loginAttempt.setUser(user);
        loginAttempt.setAttemptTime(Timestamp.from(Instant.now()));
        loginAttempt.setSuccess(success);

        // Check if user has exceeded max attempts after this login attempt
        if (!success) {
            boolean hasExceeded = hasExceededMaxAttempts(user);
            loginAttempt.setUserLocked(hasExceeded);
            if (hasExceeded) {
                user.setAccountNonLocked(false);
                loginAttempt.setState(LoginAttemptState.LOCKED); // set state to LOCKED
                user.setAccountLockCount(user.getAccountLockCount() + 1);
                logger.warn("User: {} has been locked due to exceeding max attempts. Total locks: {}",
                        user.getUsername(), user.getAccountLockCount());

                if (user.getAccountLockCount() >= 3) {
                    user.setEnabled(false);
                    loginAttempt.setState(LoginAttemptState.DISABLED); // set state to ENABLED
                    logger.warn("User: {} has been disabled due to exceeding lock count limit.", user.getUsername());
                }

                userRepository.save(user);
            }else{
                if (!user.isEnabled()) {
                    loginAttempt.setState(LoginAttemptState.DISABLED);
                } else {
                    loginAttempt.setState(LoginAttemptState.ACTIVE);
                }
            }
        } else {
            loginAttempt.setUserLocked(false);
            loginAttempt.setState(LoginAttemptState.ACTIVE); // set state to ACTIVE
            user.setAccountNonLocked(true);
            user.setEnabled(true);
            userRepository.save(user);
        }

        loginAttemptRepository.save(loginAttempt);
        logger.info("Login attempt logged for user: {} Successful: {}", user.getUsername(), success);
    }

    @Transactional
    public void removeAllLoginAttempts(User user) {
        int page = 0;
        int size = 50; // you can choose an appropriate size
        Page<LoginAttempt> attempts;

        logger.info("Attempting to remove all login attempts for user: {}", user.getUsername());

        try {
            do {
                attempts = loginAttemptRepository.findByUser(user, PageRequest.of(page++, size));
                List<LoginAttempt> attemptsContent = attempts.getContent();
                loginAttemptRepository.deleteAll(attemptsContent);
                logger.info("Successfully deleted {} login attempts for user: {}", attemptsContent.size(), user.getUsername());
            } while (attempts.hasNext());

            // Explicitly flush the changes
            loginAttemptRepository.flush();
        } catch (Exception e) {
            logger.error("An error occurred while trying to remove all login attempts for user: {}", user.getUsername(), e);
            throw new RuntimeException("Failed to remove all login attempts for user: " + user.getUsername(), e);
        }
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

