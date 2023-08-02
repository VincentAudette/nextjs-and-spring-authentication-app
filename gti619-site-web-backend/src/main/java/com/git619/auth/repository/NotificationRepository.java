package com.git619.auth.repository;

import com.git619.auth.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByIsTreatedFalse();
}

