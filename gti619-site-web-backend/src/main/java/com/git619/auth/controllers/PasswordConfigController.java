package com.git619.auth.controllers;

import com.git619.auth.domain.PasswordConfig;
import com.git619.auth.repository.PasswordConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-config")
public class PasswordConfigController {

    private final PasswordConfigRepository passwordConfigRepository;

    @Autowired
    public PasswordConfigController(PasswordConfigRepository passwordConfigRepository) {
        this.passwordConfigRepository = passwordConfigRepository;
    }

    @PostMapping
    public PasswordConfig createPasswordConfig(@RequestBody PasswordConfig newConfig) {
        newConfig.setId(1L);
        return passwordConfigRepository.save(newConfig);
    }


    @GetMapping
    public PasswordConfig getPasswordConfig() {
        return passwordConfigRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Password Config not found!"));
    }

    @PutMapping
    public PasswordConfig updatePasswordConfig(@RequestBody PasswordConfig newConfig) {
        return passwordConfigRepository.findById(1L).map(config -> {
            config.setNeedsNumber(newConfig.getNeedsNumber());
            config.setNeedsSpecialCharacter(newConfig.getNeedsSpecialCharacter());
            config.setNeedsUppercase(newConfig.getNeedsUppercase());
            config.setPasswordLength(newConfig.getPasswordLength());
            return passwordConfigRepository.save(config);
        }).orElseThrow(() -> new IllegalArgumentException("Password Config not found!"));
    }
}
