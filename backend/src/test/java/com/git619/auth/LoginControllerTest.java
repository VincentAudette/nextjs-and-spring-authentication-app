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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class LoginControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

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

        Authentication authentication = new UsernamePasswordAuthenticationToken("user1", "pass1");

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(userService.findByUsername(any())).thenReturn(user);
        when(userService.createToken(any())).thenReturn("mockToken");

        SecurityContextHolder.getContext().setAuthentication(authentication);

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1\", \"password\":\"pass1\"}"))
                .andExpect(status().isOk());
    }
}

