package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.dto.UserDTO;
import com.git619.auth.utils.Role;
import com.git619.auth.services.UserService;
import com.git619.auth.utils.RoleUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = "/api")
public class UserController {
    @Autowired UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {

        System.out.println("USER DTO ==============");
        System.out.println(userDTO);

        // Ici, nous validons le rôle. Si ce n'est pas valide, une exception sera lancée
        Role role = RoleUtils.getRoleFromString(userDTO.getRole());


        // Association des valuers: nom d'utilisateur, mot de passe encrypté, salt et Role
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setSalt(userDTO.getSalt());
        user.setRole(role);

        System.out.println("USER ==============");
        System.out.println(user);

        // Puis, nous créons l'utilisateur
        User createdUser = userService.createUser(user);

        // Si l'utilisateur n'est pas créé avec succès, retourne le statut HTTP 500
        if (createdUser == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Retourne le statut HTTP 201 Created
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }


    @GetMapping("/user")
    public ResponseEntity<String> getAllUsers(
            @RequestHeader Map<String, String> headers
    ) {
        List<User> users;
        System.out.println("Here");
        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            users = userService.getAll();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(new JSONArray(users).toString());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<String> getUserById(
            @RequestHeader Map<String, String> headers,
            @PathVariable String id
    ) {
        User user;
        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            user = userService.getUserById(Long.parseLong(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(new JSONObject(user).toString());
    }

//    @PostMapping("/user")
//    public ResponseEntity<String> createUser(
//            @RequestHeader Map<String, String> headers,
//            @RequestBody User user
//    ) {
//
//        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
//        try {
//            System.out.println(user);
//            userService.createUser(user);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }

    @PostMapping("/user/v2")
    @ResponseBody
    public ResponseEntity<String> createUser2(
            @RequestHeader Map<String, String> headers,
            String username,
            String password,
            String salt,
            String role
    ) {

        /*
         Vérification de la validité du role.

         Les rôles permis ici sont:
         1. ADMINISTRATEUR
         2. PREPOSE_AUX_CLIENTS_RESIDENTIELS
         3. PREPOSE_AUX_CLIENTS_DAFFAIRE
         */
        Role roleEnum;
        try {
            roleEnum = Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role");
        }


        try {
            User user = new User(username, password, salt, roleEnum);
            System.out.println(user);
            userService.createUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/user/edit")
    public ResponseEntity<String> editUser(
            @RequestHeader Map<String, String> headers,
            @RequestBody User user
    ) {

        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            userService.editUser(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/user/delete/{id}")
    public ResponseEntity<String> deleteUser(
            @RequestHeader Map<String, String> headers,
            @PathVariable String id
    ) {
        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            // Delete user
            userService.delete(Long.parseLong(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
