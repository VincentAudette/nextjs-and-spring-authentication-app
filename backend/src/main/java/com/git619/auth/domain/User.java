package com.git619.auth.domain;

import javax.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name="AUTH_USER")
public class User {
    @Id
    @Column(name = "USER_ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "USERNAME", columnDefinition = "VARCHAR2(255)")
    private String username;

    @NonNull
    @Column(name = "PASSWORD", columnDefinition = "VARCHAR2(255)")
    private String password;

    @Column(name = "SALT", columnDefinition = "VARCHAR2(255)")
    private String salt;

    @Column(name = "ROLE", columnDefinition = "VARCHAR2(255)")
    private String role;

    public User(@NonNull String username, @NonNull String password, String salt, String role) {
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.role = role;
    }

    public User() {}

    public Long getId() {
        return id;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    @NonNull
    public String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}