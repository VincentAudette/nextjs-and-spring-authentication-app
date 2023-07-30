package com.git619.auth.services;

import com.git619.auth.domain.PasswordConfig;
import com.git619.auth.repository.PasswordConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class PasswordConfigService {

    @Autowired
    private PasswordConfigRepository repository;

    @Cacheable(value = "passwordConfig")
    public PasswordConfig getPasswordConfig() {
        return repository.findFirstByOrderByIdAsc();
    }

    @CachePut(value = "passwordConfig")
    public PasswordConfig updatePasswordConfig(PasswordConfig passwordConfig) {
        PasswordConfig existingConfig = getPasswordConfig();
        if(existingConfig != null) {
            passwordConfig.setId(existingConfig.getId()); //preserve the ID
        }
        return repository.save(passwordConfig);
    }

    public boolean validatePassword(String password) {
        PasswordConfig passwordConfig = getPasswordConfig();
        return validatePasswordLength(password, passwordConfig)
                && validateNeedsNumber(password, passwordConfig)
                && validateNeedsSpecialCharacter(password, passwordConfig)
                && validateNeedsUppercase(password, passwordConfig);
    }

    private boolean validatePasswordLength(String password, PasswordConfig passwordConfig) {
        return password.length() >= passwordConfig.getPasswordLength();
    }

    private boolean validateNeedsNumber(String password, PasswordConfig passwordConfig) {
        if (!passwordConfig.getNeedsNumber()) return true;
        return password.matches(".*\\d.*");
    }

    private boolean validateNeedsSpecialCharacter(String password, PasswordConfig passwordConfig) {
        if (!passwordConfig.getNeedsSpecialCharacter()) return true;
        return password.matches(".*[!@#$%^&*].*");
    }

    private boolean validateNeedsUppercase(String password, PasswordConfig passwordConfig) {
        if (!passwordConfig.getNeedsUppercase()) return true;
        return !password.equals(password.toLowerCase());
    }
}
