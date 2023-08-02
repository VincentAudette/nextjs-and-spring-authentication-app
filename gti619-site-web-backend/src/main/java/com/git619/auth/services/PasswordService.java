package com.git619.auth.services;

import com.git619.auth.domain.PasswordChangeRecord;
import com.git619.auth.domain.PasswordConfig;
import com.git619.auth.domain.User;
import com.git619.auth.repository.PasswordChangeRecordRepository;
import com.git619.auth.utils.PasswordChangeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collections;

@Service
public class PasswordService {

    private final PasswordConfigService passwordConfigService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private PasswordChangeRecordRepository passwordChangeRecordRepository;

    @Autowired
    public PasswordService(PasswordConfigService passwordConfigService, PasswordEncoder passwordEncoder) {
        this.passwordConfigService = passwordConfigService;
        this.passwordEncoder = passwordEncoder;
    }

    public String generateTemporaryPassword() {
        PasswordConfig config = passwordConfigService.getPasswordConfig();
        int passwordLength = config.getPasswordLength();

        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialCharacters = "!@#$%^&*";

        // Prend en compte au moins une lettre minuscule
        StringBuilder possibleCharacters = new StringBuilder(lowerCaseLetters);
        if (config.getNeedsUppercase()) {
            possibleCharacters.append(upperCaseLetters);
        }
        if (config.getNeedsNumber()) {
            possibleCharacters.append(numbers);
        }
        if (config.getNeedsSpecialCharacter()) {
            possibleCharacters.append(specialCharacters);
        }

        SecureRandom random = new SecureRandom();
        StringBuilder tempPassword = new StringBuilder();

        if (config.getNeedsUppercase()) {
            tempPassword.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
            passwordLength--;
        }
        if (config.getNeedsNumber() && passwordLength > 0) {
            tempPassword.append(numbers.charAt(random.nextInt(numbers.length())));
            passwordLength--;
        }
        if (config.getNeedsSpecialCharacter() && passwordLength > 0) {
            tempPassword.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));
            passwordLength--;
        }

        for (int i = 0; i < passwordLength; i++) {
            tempPassword.append(possibleCharacters.charAt(random.nextInt(possibleCharacters.length())));
        }
        Collections.shuffle(Arrays.asList(tempPassword.toString().split("")));
        return tempPassword.toString();
    }


    public void recordUserModifiedPassword(User user) {
        recordPasswordChange(user, PasswordChangeType.USER_MODIFIED);
    }

    public void recordAdminResetPassword(User user) {
        recordPasswordChange(user, PasswordChangeType.ADMIN_RESET);
    }

    private void recordPasswordChange(User user, PasswordChangeType changeType) {
        PasswordChangeRecord record = new PasswordChangeRecord();
        record.setUser(user);
        record.setChangeType(changeType);
        record.setChangeTimestamp(ZonedDateTime.now());
        passwordChangeRecordRepository.save(record);
    }

    public String encodePassword(String password, String salt) {
        return passwordEncoder.encode(password + salt);
    }

    public boolean validatePassword(String password) {
        return passwordConfigService.validatePassword(password).equals("OK");
    }
}

