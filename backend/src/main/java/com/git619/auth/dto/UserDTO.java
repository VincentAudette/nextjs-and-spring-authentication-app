package com.git619.auth.dto;

import com.git619.auth.utils.Role;

public class UserDTO {

    private String username;
    private String password;
    private String salt;
    private String role;

    public UserDTO() {}

    public UserDTO(String username, String password, String salt, String role) {
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
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
        return "UserDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", role=" + role +
                '}';
    }
}

