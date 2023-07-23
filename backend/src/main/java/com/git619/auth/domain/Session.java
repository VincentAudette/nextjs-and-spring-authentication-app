package com.git619.auth.domain;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="AUTH_SESSION")
public class Session {

    @Id
    @Column(name = "SESSION_ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(name = "ACTIVE", columnDefinition = "NUMBER(1,0)")
    private Boolean active;

    @Column(name = "TOKEN", columnDefinition = "VARCHAR2(255)")
    private String token;

    @Column(name = "CREATED_AT", columnDefinition = "TIMESTAMP(3)")
    private Timestamp createdAt;

    @Column(name = "LAST_ACCESSED", columnDefinition = "TIMESTAMP(3)")
    private Timestamp lastAccessed;

    public Session(Boolean active, String token, Timestamp createdAt, Timestamp lastAccessed) {
        this.active = active;
        this.token = token;
        this.createdAt = createdAt;
        this.lastAccessed = lastAccessed;
    }

    public Session() {}

    public Long getId() {
        return id;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
                ", token='" + token + '\'' +
                ", createdAt=" + createdAt +
                ", lastAccessed=" + lastAccessed +
                '}';
    }
}
