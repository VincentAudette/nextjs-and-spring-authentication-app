package com.git619.auth.services;

import com.git619.auth.utils.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
public class AuthTokenService {

    private Key key;
    private static final String SECRET_KEY ="Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY=";
    public AuthTokenService() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)); // this should be moved to a secure place
    }

    public String createToken(String username, Role role) {
        String roleName = (role != null) ? role.name() : "DEFAULT_ROLE";
        String jws = Jwts.builder().setSubject(username).claim("role", roleName).signWith(key).compact();
        return jws;
    }

}
