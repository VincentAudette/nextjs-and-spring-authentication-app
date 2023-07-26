package com.git619.auth;

import com.git619.auth.controllers.UserController;
import com.git619.auth.domain.User;
import com.git619.auth.dto.UserDTO;
import com.git619.auth.services.UserService;
import com.git619.auth.utils.Role;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ExtendWith(SpringExtension.class)
public class UserControllerTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClientControllerTest.class);

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;


    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        // Initialize the mock objects
        MockitoAnnotations.initMocks(this);

        // Mock the behavior of passwordEncoder
        String encodedPassword = "encodedPassword";
        when(passwordEncoder.encode(any())).thenReturn(encodedPassword);

        // Initialize mockMvc
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

    }

    @Test
    public void createUser() throws Exception {
        LOGGER.info("Running createUser test...");
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("user1");
        userDTO.setPassword("pass1");
        userDTO.setRole("Administrateur");

        User user = new User();
        user.setUsername("user1");
        user.setPassword(passwordEncoder.encode("pass1"));
        user.setRole(Role.ADMINISTRATEUR);

        when(userService.createUser(any(User.class))).thenReturn(user);
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");

        mockMvc.perform(post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username", is(userDTO.getUsername())))
                .andExpect(jsonPath("$.password", is("encodedPassword")))
                .andExpect(jsonPath("$.role", is(userDTO.getRole())));
    }








}
