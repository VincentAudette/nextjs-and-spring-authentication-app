package com.git619.auth.controllers;

import com.git619.auth.utils.Role;
import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.services.ClientResidentielService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientResidentiel")
public class ClientResidentielController {

    private final ClientResidentielService clientResidentielService;

    public ClientResidentielController(ClientResidentielService clientResidentielService) {
        this.clientResidentielService = clientResidentielService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMINISTRATEUR') or hasAuthority('ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS')")
    @GetMapping("/list")
    public Page<ClientResidentiel> getClients(int page, int size) {
        return clientResidentielService.getAll(PageRequest.of(page, size));
    }
}

