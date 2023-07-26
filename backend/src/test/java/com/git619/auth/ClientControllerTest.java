package com.git619.auth;

import com.git619.auth.controllers.ClientController;
import com.git619.auth.domain.ClientAffaire;
import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.services.ClientAffaireService;
import com.git619.auth.services.ClientResidentielService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class ClientControllerTest {

    @Mock
    private ClientResidentielService clientResidentielService;

    @Mock
    private ClientAffaireService clientAffaireService;

    @InjectMocks
    private ClientController clientController;

    private MockMvc mockMvc;


    @BeforeEach
    public void setup() {
        // Initialize the mock objects
        MockitoAnnotations.initMocks(this);

        // Initialize mockMvc
        mockMvc = MockMvcBuilders.standaloneSetup(clientController).build();
    }

    @Test
    public void addClientResidentiel() throws Exception {
        ClientResidentiel clientResidentiel = new ClientResidentiel();
        // Initialize fields of clientResidentiel if any

        when(clientResidentielService.addClientResidentiel(any(ClientResidentiel.class))).thenReturn(clientResidentiel);

        mockMvc.perform(post("/api/clients/residentiel")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(clientResidentiel)))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    public void addClientAffaire() throws Exception {
        ClientAffaire clientAffaire = new ClientAffaire();
        // Initialize fields of clientAffaire if any

        when(clientAffaireService.addClientAffaire(any(ClientAffaire.class))).thenReturn(clientAffaire);

        mockMvc.perform(post("/api/clients/affaire")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(clientAffaire)))
                .andExpect(status().isOk());
    }
}
