package com.git619.auth.repository;

import com.git619.auth.domain.PasswordChangeRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordChangeRecordRepository extends JpaRepository<PasswordChangeRecord, Long> {
}

