package com.git619.auth.services;

import com.git619.auth.domain.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionCleanupService {
    @Autowired
    private SessionService sessionService;

    @Scheduled(fixedRate = 60000) // runs every 60,000 milliseconds, or 1 minute
    public void deactivateExpiredSessions() {
        // retrieve all active sessions
        List<Session> activeSessions = sessionService.getAllActiveSessions();

        for(Session session : activeSessions) {
            if(isSessionExpired(session)) {
                session.setActive(false);
                sessionService.editSession(session);
            }
        }
    }

    private boolean isSessionExpired(Session session) {
        long sessionTimeoutMillis = 30 * 60 * 1000;

        long currentTimeMillis = System.currentTimeMillis();
        long lastAccessedTimeMillis = session.getLastAccessed().getTime();

        return (currentTimeMillis - lastAccessedTimeMillis) > sessionTimeoutMillis;
    }
}
