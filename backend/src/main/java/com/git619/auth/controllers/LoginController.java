package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.security.AuthToken;
import com.git619.auth.services.LoginAttemptService;
import com.git619.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping(value = "/api")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LoginAttemptService loginAttemptService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        logger.info("Received login request for user: {}", user.getUsername());
        User existingUser =null;
        try {

            // Requête de l'objet complet du User de la base de données
            existingUser = userService.findByUsername(user.getUsername());
            logger.info("Existing using is: {}", existingUser);

            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aucun compte n'existe avec cet identifiant.");
            }

            // On récupère le salt de l'utilisateur existant et on l'applique au mdp entré
            Boolean authenticated = passwordEncoder.matches(user.getPassword() + existingUser.getSalt(), existingUser.getPassword());

            logger.info("Authentication worked - {}", authenticated);

            if(!authenticated){
                userService.loginFailed(existingUser);
                logger.info("Exceeded max attempts {}", userService.hasExceededMaxAttempts(existingUser));
                if(userService.hasExceededMaxAttempts(existingUser)){
                    return new ResponseEntity<>(
                            "Vous avez dépassé le nombre maximal de tentatives de connexion. Veuillez réessayer après "
                                    + getRetryTimeFormatted(existingUser) + ".", HttpStatus.TOO_MANY_REQUESTS);
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Le mot de passe ne correspond pas.");
                }
            }

            userService.checkUserEligibility(existingUser);
            userService.loginSuccessful(existingUser);

            // Si les identifiants sont valide, le jeton sera retourné.
            final String token = userService.createToken(existingUser);
            logger.info("Token created for user: {}", existingUser.getUsername());
            AuthToken authToken = new AuthToken(token);
            // On retourne le jeton
            return ResponseEntity.ok(authToken);

        } catch (AuthenticationException e) {
            userService.loginFailed(existingUser);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (ResponseStatusException e) {
            userService.loginFailed(existingUser);
            return ResponseEntity.status(e.getStatus()).body(e.getReason());
        }catch (RuntimeException e) {
            logger.error("Exception caught: {}", e.getMessage());
            // Vérification que max attempts est atteint userService.createToken()
            if ("Nombre d’essais autorisés dépassé.".equals(e.getMessage())) {
                // Réponse avec 429 (Trop de requêtes)
                return new ResponseEntity<>(
                            "Vous avez dépassé le nombre maximal de tentatives de connexion. Veuillez réessayer après "
                                    + getRetryTimeFormatted(existingUser) + ".", HttpStatus.TOO_MANY_REQUESTS);
            }
            userService.loginFailed(existingUser);
        } catch (Exception e) {
            logger.error("General exception caught: {}", e.getMessage());
            userService.loginFailed(existingUser);  // Calling loginFailed for all other exceptions
            throw e;
        }
        return null;
    }



    private String getRetryTimeFormatted(User existingUser){
        ZonedDateTime timeToRetry = userService.getTimeToRetry(existingUser);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return timeToRetry.format(formatter);
    }

    @DeleteMapping("/login/attempts/{username}")
    public ResponseEntity<?> removeAllLoginAttempts(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if(user != null){
            loginAttemptService.removeAllLoginAttempts(user);
            return ResponseEntity.ok().body("All login attempts for user " + username + " have been removed.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found with username: " + username);
        }
    }




}

