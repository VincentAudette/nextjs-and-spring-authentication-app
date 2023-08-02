package com.git619.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.git619.auth.domain.User;
import com.git619.auth.repository.UserRepository;
import com.git619.auth.security.JwtAuthenticationFilter;
import com.git619.auth.services.AuthTokenService;
import com.git619.auth.utils.Role;
import org.junit.Ignore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class JwtAuthenticationFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthTokenService authTokenService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = new User();
        user.setUsername("TestAdmin");
        user.setPassword(passwordEncoder.encode("123"));
        user.setRole(Role.ROLE_ADMINISTRATEUR);
        userRepository.save(user);
    }


    @Test
    public void testFilterWithValidToken() throws Exception {
        String username = "TestAdmin";
        String password = "123";
        Role role = Role.ROLE_ADMINISTRATEUR;
        // Creating a mock user for the request body
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);

        String token = authTokenService.createToken(user);



        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);

        mockMvc.perform(post("/api/login")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk());
    }


    @Test
    public void testFilterWithInvalidToken() throws Exception {
        mockMvc.perform(get("/api/user")
                        .header("Authorization", "Bearer invalidtoken"))
                .andExpect(status().isUnauthorized());
    }

    @Ignore
    @Test
    public void testFilterWithoutToken() throws Exception {
        mockMvc.perform(get("/api/user"))
                .andExpect(status().isUnauthorized());
    }

}
