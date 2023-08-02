package com.git619.auth.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Notification {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private Date timestamp;
    private boolean isTreated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isTreated() {
        return isTreated;
    }

    public void setIsTreated(boolean treated) {
        isTreated = treated;
    }
}
