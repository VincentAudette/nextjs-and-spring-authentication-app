package com.git619.auth.services;

import com.git619.auth.domain.ClientAffaire;
import com.git619.auth.repository.ClientAffaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClientAffaireService {

    private final ClientAffaireRepository clientAffaireRepository;

    @Autowired
    public ClientAffaireService(ClientAffaireRepository clientAffaireRepository) {
        this.clientAffaireRepository = clientAffaireRepository;
    }

    public Page<ClientAffaire> getAll(Pageable pageable) {
        return clientAffaireRepository.findAll(pageable);
    }

    public ClientAffaire addClientAffaire(ClientAffaire clientAffaire) {
        return clientAffaireRepository.save(clientAffaire);
    }
}

