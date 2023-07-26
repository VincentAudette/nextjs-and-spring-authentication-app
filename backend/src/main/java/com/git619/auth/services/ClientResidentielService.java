package com.git619.auth.services;

import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.repository.ClientResidentielRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClientResidentielService {

    private final ClientResidentielRepository clientResidentielRepository;

    @Autowired
    public ClientResidentielService(ClientResidentielRepository clientResidentielRepository) {
        this.clientResidentielRepository = clientResidentielRepository;
    }

    public Page<ClientResidentiel> getAll(Pageable pageable) {
        return clientResidentielRepository.findAll(pageable);
    }

    public ClientResidentiel addClientResidentiel(ClientResidentiel clientResidentiel) {
        return clientResidentielRepository.save(clientResidentiel);
    }
}
