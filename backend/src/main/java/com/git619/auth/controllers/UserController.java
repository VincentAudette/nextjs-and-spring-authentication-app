package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.services.UserService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class UserController {
    @Autowired UserService userService;

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

    @PostMapping("/user")
    public ResponseEntity<String> createUser(
            @RequestHeader Map<String, String> headers,
            @RequestBody User user
    ) {

        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            System.out.println(user);
            userService.createUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/user/v2")
    @ResponseBody
    public ResponseEntity<String> createUser2(
            @RequestHeader Map<String, String> headers,
            String username,
            String password,
            String salt,
            String role
    ) {

        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            User user = new User(username, password, salt, role);
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
            userService.ediUser(user);
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
