package com.git619.auth.controllers;

import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.domain.ClientAffaire;
import com.git619.auth.dto.ClientDTO;
import com.git619.auth.services.ClientResidentielService;
import com.git619.auth.services.ClientAffaireService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/residentiels")
    public ResponseEntity<List<ClientResidentiel>> addMultipleClientResidentiel(@RequestBody ClientDTO clientDTO) {
        List<ClientResidentiel> createdClients = clientResidentielService.addMultipleClientResidentiel(clientDTO.getNames());
        return ResponseEntity.ok(createdClients);
    }

    @PostMapping("/affaires")
    public ResponseEntity<List<ClientAffaire>> addMultipleClientAffaire(@RequestBody ClientDTO clientDTO) {
        List<ClientAffaire> createdClients = clientAffaireService.addMultipleClientAffaire(clientDTO.getNames());
        return ResponseEntity.ok(createdClients);
    }

    @DeleteMapping("/residentiel/{id}")
    public ResponseEntity<Void> deleteClientResidentiel(@PathVariable Long id) {
        clientResidentielService.deleteClientResidentiel(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/affaire/{id}")
    public ResponseEntity<Void> deleteClientAffaire(@PathVariable Long id) {
        clientAffaireService.deleteClientAffaire(id);
        return ResponseEntity.ok().build();
    }


}
