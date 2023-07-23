package com.git619.auth.services;

import com.git619.auth.domain.Session;
import com.git619.auth.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(Session session) {
        return sessionRepository.save(new Session(
                session.getActive(),
                session.getToken(),
                session.getCreatedAt(),
                session.getLastAccessed()
        ));
    }

    public Session editSession(Session sessionEdit) {
        return sessionRepository.save(sessionEdit);
    }

    public void delete(Long id) {
        sessionRepository.deleteById(id);
    }

    public List<Session> getAll() {
        return StreamSupport.stream(
                sessionRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findSessionById(id);
    }

    public Session getSessionByToken(String token) {
        return sessionRepository.findSessionByToken(token);
    }
}
