package com.git619.auth.services;

import com.git619.auth.domain.ClientResidentiel;
import com.git619.auth.repository.ClientResidentielRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public List<ClientResidentiel> addMultipleClientResidentiel(List<String> names) {
        List<ClientResidentiel> clients = names.stream()
                .map(name -> {
                    ClientResidentiel client = new ClientResidentiel();
                    client.setName(name);
                    return clientResidentielRepository.save(client);
                })
                .collect(Collectors.toList());

        return clients;
    }

    public void deleteClientResidentiel(Long id) {
        clientResidentielRepository.deleteById(id);
    }

}
