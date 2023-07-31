package com.git619.auth.services;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import com.git619.auth.dto.UpdatePasswordDTO;
import com.git619.auth.exceptions.CurrentPasswordMismatchException;
import com.git619.auth.exceptions.InvalidPasswordException;
import com.git619.auth.exceptions.PasswordConfirmationMismatchException;
import com.git619.auth.exceptions.PasswordUsedBeforeException;
import com.git619.auth.repository.LoginAttemptRepository;
import com.git619.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;
    private final LoginAttemptService loginAttemptService;

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    @Autowired
    private PasswordConfigService passwordConfigService;

    private PasswordEncoder passwordEncoder;



    @Autowired
    public UserService(UserRepository userRepository, AuthTokenService authTokenService,
                       PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService) {
        this.userRepository = userRepository;
        this.authTokenService = authTokenService;
        this.passwordEncoder= passwordEncoder;
        this.loginAttemptService = loginAttemptService;
    }

    public User createUser(User user) {
        return userRepository.save(new User(
                user.getUsername(),
                user.getPassword(),
                user.getSalt(),
                user.getRole()
        ));
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public Page<LoginAttempt> getLoginAttempts(User user, Pageable pageable) {
        return loginAttemptRepository.findAllByUserOrderByAttemptTimeDesc(user, pageable);
    }


    public void loginSuccessful(User user) {
        loginAttemptService.createLoginAttempt(user, true);
    }

    public void loginFailed(User user) {
        loginAttemptService.createLoginAttempt(user, false);
    }

    public boolean hasExceededMaxAttempts(User user){
        return loginAttemptService.hasExceededMaxAttempts(user);
    }

    public User editUser(User userEdit) {
        return userRepository.save(userEdit);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public List<User> getAll() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String createToken(User user) {
        if (loginAttemptService.hasExceededMaxAttempts(user)) {
            logger.warn("Maximum login attempts exceeded for user: {}", user.getUsername());
            throw new RuntimeException("Nombre d’essais autorisés dépassé.");
        }

        try {
            String token = authTokenService.createToken(user);
            loginAttemptService.createLoginAttempt(user, true);
            return token;
        } catch (Exception ex) {
            loginAttemptService.createLoginAttempt(user, false);
            throw ex;
        }
    }

    public ZonedDateTime getTimeToRetry(User user) {
        return loginAttemptService.getTimeToRetry(user);
    }



    public boolean updatePassword(User user, UpdatePasswordDTO updatePasswordDTO) {
        if (!passwordEncoder.matches(updatePasswordDTO.getCurrentPassword() + user.getSalt(), user.getPassword())) {
            // Mot de passe n'est pas identique à l'acutel
            throw new CurrentPasswordMismatchException();
        }



        if (!updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getNewPasswordConfirmation())) {
            // La confirmation de mot de passe n'est pas identique que le nouveau mot de passe
            throw new PasswordConfirmationMismatchException();
        }

        String validationMessage = passwordConfigService.validatePassword(updatePasswordDTO.getNewPassword());
        if (!validationMessage.equals("OK")) {
            // L'erreur est envoyé avec un message indiquant lequel n'est pas respecté
            throw new InvalidPasswordException(validationMessage);
        }


        boolean isPasswordUsedBefore = user.getOldPasswords().stream()
                .anyMatch(oldPassword -> passwordEncoder.matches(updatePasswordDTO.getNewPassword() + user.getSalt(), oldPassword));

        if (isPasswordUsedBefore) {
            // Le nouveau mot de passe à été utilisé au paravant
            throw new PasswordUsedBeforeException();
        }


        // Tous les conditions sont valide
        user.getOldPasswords().add(user.getPassword());
        user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword() + user.getSalt()));
        userRepository.save(user);

        return true;
    }



}
