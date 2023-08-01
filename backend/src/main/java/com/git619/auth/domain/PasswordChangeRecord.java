package com.git619.auth.domain;

import com.git619.auth.utils.PasswordChangeType;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
public class PasswordChangeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private PasswordChangeType changeType; // Type of password change

    private ZonedDateTime changeTimestamp; // Time of change

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PasswordChangeType getChangeType() {
        return changeType;
    }

    public void setChangeType(PasswordChangeType changeType) {
        this.changeType = changeType;
    }

    public ZonedDateTime getChangeTimestamp() {
        return changeTimestamp;
    }

    public void setChangeTimestamp(ZonedDateTime changeTimestamp) {
        this.changeTimestamp = changeTimestamp;
    }
}

