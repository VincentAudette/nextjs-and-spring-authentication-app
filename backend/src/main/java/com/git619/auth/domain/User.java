package com.git619.auth.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.git619.auth.utils.Role;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;



@Entity
@Table(name="AUTH_USER")
public class User implements UserDetails{


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
    @Enumerated(EnumType.STRING)
    private Role role;


    public User(@NonNull String username, @NonNull String password, String salt, Role role) {
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
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

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(role.name()));
    }

    @Column(name = "ACCOUNT_NON_EXPIRED", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean accountNonExpired = true;

    @Column(name = "ACCOUNT_NON_LOCKED", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean accountNonLocked = true;

    @Column(name = "CREDENTIALS_NON_EXPIRED", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean credentialsNonExpired = true;

    @Column(name = "ENABLED", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean enabled = true;


    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
