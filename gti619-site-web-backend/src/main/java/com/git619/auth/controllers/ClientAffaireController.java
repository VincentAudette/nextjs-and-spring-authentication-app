package com.git619.auth.controllers;

import com.git619.auth.domain.ClientAffaire;
import com.git619.auth.services.ClientAffaireService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientAffaire")
public class ClientAffaireController {

    private final ClientAffaireService clientAffaireService;

    public ClientAffaireController(ClientAffaireService clientAffaireService) {
        this.clientAffaireService = clientAffaireService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMINISTRATEUR') or hasAuthority('ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE')")
    @GetMapping("/list")
    public Page<ClientAffaire> getClients(int page, int size) {
        return clientAffaireService.getAll(PageRequest.of(page, size));
    }
}
