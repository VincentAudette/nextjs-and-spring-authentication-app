package com.git619.auth.repository;

import com.git619.auth.domain.PasswordChangeRecord;
import com.git619.auth.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordChangeRecordRepository extends JpaRepository<PasswordChangeRecord, Long> {
    Page<PasswordChangeRecord> findByUserOrderByChangeTimestampDesc(User user, Pageable pageable);
}

