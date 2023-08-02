package com.git619.auth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name="AUTH_SESSION")
public class Session {

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=false)
    @JsonIgnore
    private User user;

    @Id
    @Column(name = "SESSION_ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(name = "ACTIVE", columnDefinition = "NUMBER(1,0)")
    private Boolean active;

    @Column(name = "CREATED_AT", columnDefinition = "TIMESTAMP(3)")
    private Timestamp createdAt;

    @Column(name = "LAST_ACCESSED", columnDefinition = "TIMESTAMP(3)")
    private Timestamp lastAccessed;

    public Session(User user) {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        this.active = true;
        this.createdAt = now;
        this.lastAccessed = now;
        this.user = user;
    }


    public Session() {}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Timestamp lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", active=" + active +
                ", createdAt=" + createdAt +
                ", lastAccessed=" + lastAccessed +
                '}';
    }
}

