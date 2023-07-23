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

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(new User(
                user.getUsername(),
                user.getPassword(),
                user.getSalt(),
                user.getRole()
        ));
    }

    public User ediUser(User userEdit) {
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
}