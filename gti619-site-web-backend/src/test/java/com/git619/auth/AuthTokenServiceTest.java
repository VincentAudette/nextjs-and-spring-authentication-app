package com.git619.auth;

import com.git619.auth.domain.User;
import com.git619.auth.services.AuthTokenService;
import com.git619.auth.utils.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthTokenServiceTest {

    private AuthTokenService authTokenService;
    private static final String SECRET_KEY = "Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY=";

    @BeforeEach
    public void setup() {
        authTokenService = new AuthTokenService();
    }

    @Test
    public void testCreateToken() {
        String username = "TestAdmin";
        String password = "123";
        Role role = Role.ROLE_ADMINISTRATEUR;
        // Creating a mock user for the request body
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);

        String token = authTokenService.createToken(user);

        // Extract claims from the token
        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token);

        assertEquals(username, jws.getBody().getSubject());
        assertEquals(role.name(), jws.getBody().get("role"));
    }

}

