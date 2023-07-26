package com.git619.auth;

import com.git619.auth.security.JwtAuthenticationFilter;
import com.git619.auth.services.AuthTokenService;
import com.git619.auth.utils.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

    @Test
    public void testFilterWithValidToken() throws Exception {
        String username = "testUser";
        Role role = Role.ADMINISTRATEUR;
        String token = authTokenService.createToken(username, role);

        mockMvc.perform(get("/api/user")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    public void testFilterWithInvalidToken() throws Exception {
        mockMvc.perform(get("/api/user")
                        .header("Authorization", "Bearer invalidtoken"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testFilterWithoutToken() throws Exception {
        mockMvc.perform(get("/api/user"))
                .andExpect(status().isUnauthorized());
    }

}
