package com.git619.auth.dto;

import com.git619.auth.utils.Role;

public class UserDTO {

    private String username;
    private String role;
    private boolean accountNonLocked;

    private boolean enabled;

    private boolean needsToResetPassword;

    public UserDTO() {}

    public UserDTO(String username, String role, boolean accountNonLocked, boolean enabled, boolean needsToResetPassword) {
        this.username = username;
        this.role = role;
        this.accountNonLocked = accountNonLocked;
        this.enabled =enabled;
        this.needsToResetPassword = needsToResetPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isNeedsToResetPassword() {
        return needsToResetPassword;
    }

    public void setNeedsToResetPassword(boolean needsToResetPassword) {
        this.needsToResetPassword = needsToResetPassword;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", accountNonLocked=" + accountNonLocked +
                ", enabled=" + enabled +
                ", needsToResetPassword=" + needsToResetPassword +
                '}';
    }
}
