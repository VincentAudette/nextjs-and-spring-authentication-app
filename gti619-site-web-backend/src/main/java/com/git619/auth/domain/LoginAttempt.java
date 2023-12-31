package com.git619.auth.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.git619.auth.utils.LoginAttemptState;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="LOGIN_ATTEMPT")
public class LoginAttempt {

    @Id
    @Column(name = "ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=false, updatable=false)
    @JsonBackReference
    private User user;


    @Column(name = "ATTEMPT_TIME", columnDefinition = "TIMESTAMP(3)")
    private Timestamp attemptTime;

    @Column(name = "SUCCESS", columnDefinition = "NUMBER(1,0)")
    private Boolean success;

    @Column(name = "USER_LOCKED", columnDefinition = "NUMBER(1,0)")
    private Boolean userLocked;

    @Column(name = "STATE")
    @Enumerated(EnumType.STRING)
    private LoginAttemptState state;


    public LoginAttemptState getState() {
        return state;
    }

    public void setState(LoginAttemptState state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getAttemptTime() {
        return attemptTime;
    }


    public void setAttemptTime(Timestamp attemptTime) {
        this.attemptTime = attemptTime;
    }

    public Boolean getUserLocked() {
        return userLocked;
    }

    public void setUserLocked(Boolean userLocked) {
        this.userLocked = userLocked;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}

