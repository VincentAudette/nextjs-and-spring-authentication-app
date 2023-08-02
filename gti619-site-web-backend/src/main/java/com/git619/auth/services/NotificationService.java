package com.git619.auth.services;

import com.git619.auth.domain.Notification;
import com.git619.auth.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getUntreatedNotifications() {
        return notificationRepository.findAllByIsTreatedFalse();
    }

    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public Notification updateNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
