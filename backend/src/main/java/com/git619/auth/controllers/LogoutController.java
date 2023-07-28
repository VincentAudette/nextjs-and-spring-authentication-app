package com.git619.auth.controllers;

import com.git619.auth.domain.Session;
import com.git619.auth.security.JwtAuthenticationFilter;
import com.git619.auth.services.SessionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

@RestController
@RequestMapping(value = "/api")
public class LogoutController {

    private static final Logger LOGGER = Logger.getLogger(LogoutController.class.getName());

    @Autowired
    private SessionService sessionService;

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        LOGGER.info("Autorization header="+authorizationHeader);
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String token = authorizationHeader.substring("Bearer ".length());
        try {

            SecretKey sk = Keys.hmacShaKeyFor("Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY=".getBytes(StandardCharsets.UTF_8));
            Jws<Claims> jws = Jwts.parser().setSigningKey(sk).parseClaimsJws(token);
            LOGGER.info("JWS="+jws);
            Long sessionId = jws.getBody().get("sessionId", Long.class);
            Session session = sessionService.getSessionById(sessionId);
            LOGGER.info("Session="+session);
            if(session == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            session.setActive(false);
            sessionService.editSession(session);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (JwtException e) {
            LOGGER.severe("Error while Jwt parsing and retreiving session "+e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}

