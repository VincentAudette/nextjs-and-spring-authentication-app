package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.dto.UserDTO;
import com.git619.auth.utils.Role;
import com.git619.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;


@RestController
@RequestMapping(value = "/api")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {

        // Validation du role, s'il n'est pas valide, un exeception est envoyé
        Role role = Role.valueOf(userDTO.getRole());

        // Création du salt
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        String encodedSalt = Base64.getEncoder().encodeToString(salt);

        // Association des valeurs: username, encrypted password, salt, and Role
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setSalt(encodedSalt);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword() + encodedSalt));
        user.setRole(role);

        User createdUser = userService.createUser(user);

        // Si l'utilisateur n'est pas créer avec succès, on retourne Statut HTTP 500
        if (createdUser == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // L'utilisateur est bien créer, on retourne Statut HTTP 201
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }



}
