package com.git619.auth.services;

import com.git619.auth.domain.LoginAttempt;
import com.git619.auth.domain.User;
import com.git619.auth.repository.LoginAttemptRepository;
import com.git619.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;
    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;



    @Autowired
    public UserService(UserRepository userRepository, AuthTokenService authTokenService) {
        this.userRepository = userRepository;
        this.authTokenService = authTokenService;
    }

    public User createUser(User user) {
        return userRepository.save(new User(
                user.getUsername(),
                user.getPassword(),
                user.getSalt(),
                user.getRole()
        ));
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

}
