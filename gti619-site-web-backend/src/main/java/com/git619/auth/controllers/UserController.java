package com.git619.auth.controllers;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.PasswordChangeRecord;
import com.git619.auth.domain.Session;
import com.git619.auth.domain.User;
import com.git619.auth.dto.PasswordChangeRecordDTO;
import com.git619.auth.dto.UpdatePasswordDTO;
import com.git619.auth.dto.UserDTO;
import com.git619.auth.exceptions.CurrentPasswordMismatchException;
import com.git619.auth.exceptions.InvalidPasswordException;
import com.git619.auth.exceptions.PasswordConfirmationMismatchException;
import com.git619.auth.exceptions.PasswordUsedBeforeException;
import com.git619.auth.services.LoginAttemptService;
import com.git619.auth.services.PasswordService;
import com.git619.auth.services.SessionService;
import com.git619.auth.utils.Role;
import com.git619.auth.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/api")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    SessionService sessionService;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private PasswordService passwordService;

    @GetMapping("/user/{username}/sessions")
    public ResponseEntity<?> getUserSessions(@PathVariable String username,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size) {
        User user = userService.findByUsername(username);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Session> sessions = sessionService.getAllSessionsByUser(user, pageable);


        if (sessions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

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
//        user.setPassword(passwordEncoder.encode(userDTO.getPassword() + encodedSalt));
        user.setRole(role);

        User createdUser = userService.createUser(user);

        // Si l'utilisateur n'est pas créer avec succès, on retourne Statut HTTP 500
        if (createdUser == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // L'utilisateur est bien créer, on retourne Statut HTTP 201
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRATEUR')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAll();

        if (users == null || users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<UserDTO> userDtos = users.stream()
                .map(user -> new UserDTO(user.getUsername(), user.getRole().name(),
                        !loginAttemptService.hasExceededMaxAttempts(user), user.isEnabled(), user.isNeedsToResetPassword()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }



    @DeleteMapping("/users")
    public ResponseEntity<?> deleteAllUsers() {
        userService.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/users/{username}/login-attempts")
    public ResponseEntity<Page<LoginAttempt>> getLoginAttempts(@PathVariable String username, Pageable pageable) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.getLoginAttempts(user, pageable), HttpStatus.OK);
    }




    @GetMapping("/user/old-passwords")
    public ResponseEntity<?> getOldPasswords() {
        try {
            // Get the username of the currently authenticated user
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Find the User object associated with the authenticated user
            User user = userService.findByUsername(username);

            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            // Return the old passwords
            return new ResponseEntity<>(user.getOldPasswords(), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("Error getting old passwords", ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{username}/isLocked")
    public ResponseEntity<Boolean> isUserLocked(@PathVariable String username) {
        User user = userService.findByUsername(username);
        boolean isLocked = loginAttemptService.hasExceededMaxAttempts(user);
        return ResponseEntity.ok(isLocked);
    }

    @PostMapping("/users/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String username) {
        User user = userService.findByUsername(username);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Il n'y a pas de compte existant pour l'utilisateur "+username+".");
        }

        try {
            String tempPassword = userService.resetPassword(user);
            passwordService.recordAdminResetPassword(user);
            return ResponseEntity.ok("Le mot de passe est réinitialisé correctement. " + tempPassword);
        } catch (InvalidPasswordException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PostMapping("/users/update-account-to-enabled")
    public ResponseEntity<String> updateAccountToEnabled(@RequestParam String username) {
        User user = userService.findByUsername(username);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Il n'y a pas de compte existant pour l'utilisateur "+username+".");
        }

        try {
            // Reset the account lock count to 0
            user.setAccountLockCount(0);
            // Set the account as enabled
            user.setEnabled(true);
            // Set the account as not locked
            user.setAccountNonLocked(true);


            // save the changes to the user
            userService.editUser(user);

            return ResponseEntity.ok("Le compte est maintenant débloqué pour " +username +"." );
        } catch (InvalidPasswordException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PutMapping("/user/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDTO updatePasswordDTO) {
        try {
            if (updatePasswordDTO != null) {
                logger.info("Update password DTO=" + updatePasswordDTO);
            } else {
                logger.info("Update password DTO is null");
                return new ResponseEntity<>("Update password DTO is null", HttpStatus.BAD_REQUEST);
            }
            String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.findByUsername(username);

            userService.updatePassword(user, updatePasswordDTO);
            passwordService.recordUserModifiedPassword(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (CurrentPasswordMismatchException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (PasswordConfirmationMismatchException | InvalidPasswordException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (PasswordUsedBeforeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/users/{username}/password-change-history")
    public ResponseEntity<Page<PasswordChangeRecordDTO>> getPasswordChangeHistory(@PathVariable String username, Pageable pageable) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        Page<PasswordChangeRecordDTO> passwordChangeRecords = userService.getPasswordChangeHistory(user, pageable);
        return ResponseEntity.ok(passwordChangeRecords);
    }
}