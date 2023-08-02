package com.git619.auth;

import com.git619.auth.controllers.LoginController;
import com.git619.auth.domain.User;
import com.git619.auth.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginControllerTest.class);

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private LoginController loginController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(loginController).build();
    }

    @Test
    public void loginTest() throws Exception {
        User user = new User();
        user.setUsername("user1");
        user.setPassword("pass1");
        user.setSalt("salt");

        Authentication authentication = new UsernamePasswordAuthenticationToken("user1", "pass1");

        when(userService.findByUsername(any())).thenReturn(user);
        when(userService.createToken(any())).thenReturn("mockToken");
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1\", \"password\":\"pass1\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void loginFailMaxAttemptsTest() throws Exception {

        User user = new User();
        user.setUsername("user1");
        user.setPassword("pass1");
        user.setSalt("salt");

        Authentication authentication = new UsernamePasswordAuthenticationToken("user1", "pass1");

        when(userService.findByUsername(any())).thenReturn(user);
        when(userService.createToken(any()))
                .thenReturn("mockToken")
                .thenThrow(new RuntimeException("Nombre d’essais autorisés dépassé."));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AtomicInteger callCount = new AtomicInteger();

        when(userService.createToken(any())).thenAnswer(invocation -> {
            if (callCount.incrementAndGet() > 4) {
                throw new RuntimeException("Nombre d’essais autorisés dépassé.");
            }
            return "mockToken";
        });


        for (int i = 0; i < 5; i++) {
            try {
                mockMvc.perform(post("/api/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"username\":\"user1\", \"password\":\"pass1\"}"))
                        .andExpect(i < 4 ? status().isOk() : status().isTooManyRequests());
            } catch (Exception e) {
                LOGGER.error("Error on attempt number " + i + ": " + e.getMessage());
                throw e;
            }
        }

    }



}
