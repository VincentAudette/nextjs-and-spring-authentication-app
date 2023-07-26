package com.git619.auth.repository;

import com.git619.auth.domain.ClientResidentiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientResidentielRepository extends JpaRepository<ClientResidentiel, Long> {
}

