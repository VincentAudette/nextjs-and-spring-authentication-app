package com.git619.auth.services;

import com.git619.auth.domain.Session;
import com.git619.auth.domain.User;
import com.git619.auth.utils.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.Timestamp;

@Service
public class AuthTokenService {

    private Key key;
    private SessionService sessionService;
    private static final String SECRET_KEY ="Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY=";

    public AuthTokenService() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    @Autowired
    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    public String createToken(User user) {
        Role role = user.getRole();
        String roleName = (role != null) ? role.name() : "DEFAULT_ROLE";

        // Create and save a new Session for the user.
        Session session = new Session(user);
        session = sessionService.createSession(session);


        String jws = Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", roleName)
                .claim("sessionId", session.getId())
                .claim("needsToResetPassword", user.isNeedsToResetPassword())
                .signWith(key)
                .compact();

        return jws;
    }

}

