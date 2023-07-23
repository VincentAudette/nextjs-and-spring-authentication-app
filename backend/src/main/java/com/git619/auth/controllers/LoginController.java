package com.git619.auth.controllers;

import com.git619.auth.domain.User;
import com.git619.auth.services.SessionService;
import com.git619.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class LoginController {

    @Autowired SessionService sessionServiceService;
    @Autowired UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestHeader Map<String, String> headers,
            @RequestBody User user
    ) {

        //TODO: Check autorization (role) and return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); if not
        try {
            System.out.println(user);
            userService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
