package com.git619.auth.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.Timestamp;
import java.util.logging.Logger;

import com.git619.auth.domain.Session;
import com.git619.auth.services.SessionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Key jwtSecret;
    @Autowired
    private SessionService sessionService;

    public JwtAuthenticationFilter(String jwtSecret) {
        this.jwtSecret = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // Define a logger for this class at the top
    private static final Logger LOGGER = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    // Inside doFilterInternal method
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //Ignorer pour /api/login
        LOGGER.info("REQ URI: "+request.getRequestURI());
        if(request.getRequestURI().equals("/api/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("AUTH HEADER = "+authorizationHeader);
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            LOGGER.info("Missing or malformed Authorization header");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring("Bearer ".length());

        try {
            System.out.println("Token from request: " + token);
            Jws<Claims> jws = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            System.out.println("Generated token: " + jws);
            String username = jws.getBody().getSubject();
            String role = jws.getBody().get("role", String.class);
            LOGGER.info("Authentication successful for user: " + username + ", with role: " + role);
            Long sessionId = jws.getBody().get("sessionId", Long.class);
            LOGGER.info("Session ID is: "+sessionId);
            Session session = sessionService.getSessionById(sessionId);
            if(session == null || isSessionExpired(session)){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("SESSION_EXPIRED");
                return;
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority(role)));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // On met à jour le temps de dernière accès quand un requête vers la Base de Données est fait.
            session.setLastAccessed(new Timestamp(System.currentTimeMillis()));
            sessionService.editSession(session);

        }  catch (JwtException e) {
        System.out.println("Exception: " + e.getMessage());
        SecurityContextHolder.clearContext();

        // Respond with an error status.
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Invalid JWT token");
        return;
        }
        filterChain.doFilter(request, response);
    }
    private boolean isSessionExpired(Session session) {
        // La valeur du timeout est déterminée par le premier des trois chiffres en minutes
        long sessionTimeoutMillis = 30 * 60 * 1000;

        long currentTimeMillis = System.currentTimeMillis();
        long lastAccessedTimeMillis = session.getLastAccessed().getTime();

        return (currentTimeMillis - lastAccessedTimeMillis) > sessionTimeoutMillis;
    }
}
