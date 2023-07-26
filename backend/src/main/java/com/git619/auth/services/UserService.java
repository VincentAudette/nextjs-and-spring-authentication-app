package com.git619.auth.services;

import com.git619.auth.domain.Session;
import com.git619.auth.domain.User;
import com.git619.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;

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

    public User editUser(User userEdit) {
        return userRepository.save(userEdit);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> getAll() {
        System.out.println(userRepository.findAll());
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public String createToken(User user) {
        return authTokenService.createToken(user.getUsername(), user.getRole());
    }

}
