package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.security.AuthToken;
import com.git619.auth.security.JwtAuthenticationFilter;
import com.git619.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping(value = "/api")
public class LoginController {
    private static final Logger LOGGER = Logger.getLogger(LoginController.class.getName());

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        LOGGER.info("Received login request for user: " + user.getUsername());
        try {

            // Requête de l'objet complet du User de la base de données
            User existingUser = userService.findByUsername(user.getUsername());
            LOGGER.info("existingUser" + existingUser);

            if (existingUser == null) {
                // Si l'utilisateur n'existe pas, on retourne 401
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // On récupère le salt de l'utilisateur existant et on l'applique au mdp entré
            String saltedPassword =user.getPassword() + existingUser.getSalt();
            String encodedPassword = passwordEncoder.encode(saltedPassword);

            Boolean authenticated = passwordEncoder.matches(user.getPassword() + existingUser.getSalt(), existingUser.getPassword());

            // La vérification des deux entités (NOTE: LA BONNE FAÇON EST COMMENTÉ POUR RÉPONDRE AUX EXIGENCES DU LABORATOIRE
//            final Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            user.getUsername(),
//                            user.getPassword()
//                    )
//            );
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            LOGGER.info("authentication" + authenticated);

            if(!authenticated){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }


            // Si les identifiants sont valide, le jeton sera retourné.
            final String token = userService.createToken(existingUser);

            AuthToken authToken = new AuthToken(token);
            // On retourne le jeton
            return ResponseEntity.ok(authToken);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

