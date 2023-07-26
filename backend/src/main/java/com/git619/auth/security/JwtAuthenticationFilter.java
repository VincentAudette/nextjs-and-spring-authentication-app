package com.git619.auth.security;

import java.security.Key;
import java.util.Base64;
import java.util.logging.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
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

    public JwtAuthenticationFilter(String jwtSecret) {
        byte[] decodedKey = Base64.getDecoder().decode(jwtSecret);
        this.jwtSecret = Keys.hmacShaKeyFor(decodedKey);
    }



    // Define a logger for this class at the top
    private static final Logger LOGGER = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    // Inside doFilterInternal method
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            LOGGER.info("Missing or malformed Authorization header");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring("Bearer ".length());

        try {
            System.out.println("Token from request: " + token);
            Jws<Claims> jws = Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(token);
            System.out.println("Generated token: " + jws);
            String username = jws.getBody().getSubject();
            String role = jws.getBody().get("role", String.class);

            LOGGER.info("Authentication successful for user: " + username + ", with role: " + role);

            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, List.of(new SimpleGrantedAuthority(role)));
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtException e) {
            System.out.println("Exception: " + e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

}
