package com.git619.auth.repository;

import com.git619.auth.domain.PasswordConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordConfigRepository extends JpaRepository<PasswordConfig, Long> {
    PasswordConfig findFirstByOrderByIdAsc();
}
