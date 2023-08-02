package com.git619.auth.repository;

import com.git619.auth.domain.ClientAffaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientAffaireRepository extends JpaRepository<ClientAffaire, Long> {
}

