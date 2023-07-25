package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.security.AuthToken;
import com.git619.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {

            System.out.println("USERNAME=" +  user.getUsername());
            System.out.println("PWD=" +  user.getPassword());
            // Perform the security
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );
            System.out.println(authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Fetch the complete User object from the database
            User authenticatedUser = userService.findByUsername(user.getUsername());

            if (authenticatedUser == null) {
                // handle case where user does not exist
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // If the user credentials are correct, a token will be returned
            final String token = userService.createToken(authenticatedUser);

            AuthToken authToken = new AuthToken(token);
            // Return the token
            return ResponseEntity.ok(authToken);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

