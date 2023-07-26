package com.git619.auth.controllers;

import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.domain.ClientAffaire;
import com.git619.auth.services.ClientResidentielService;
import com.git619.auth.services.ClientAffaireService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientResidentielService clientResidentielService;
    private final ClientAffaireService clientAffaireService;

    public ClientController(ClientResidentielService clientResidentielService, ClientAffaireService clientAffaireService) {
        this.clientResidentielService = clientResidentielService;
        this.clientAffaireService = clientAffaireService;
    }

    @PostMapping("/residentiel")
    public ResponseEntity<ClientResidentiel> addClientResidentiel(@RequestBody ClientResidentiel clientResidentiel) {
        ClientResidentiel createdClient = clientResidentielService.addClientResidentiel(clientResidentiel);
        return ResponseEntity.ok(createdClient);
    }

    @PostMapping("/affaire")
    public ResponseEntity<ClientAffaire> addClientAffaire(@RequestBody ClientAffaire clientAffaire) {
        ClientAffaire createdClient = clientAffaireService.addClientAffaire(clientAffaire);
        return ResponseEntity.ok(createdClient);
    }
}
