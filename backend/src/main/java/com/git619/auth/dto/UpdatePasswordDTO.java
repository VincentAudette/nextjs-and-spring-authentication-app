package com.git619.auth.dto;

public class UpdatePasswordDTO {
    private String currentPassword;
    private String newPassword;
    private String newPasswordConfirmation;

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordConfirmation() {
        return newPasswordConfirmation;
    }

    public void setNewPasswordConfirmation(String newPasswordConfirmation) {
        this.newPasswordConfirmation = newPasswordConfirmation;
    }

    @Override
    public String toString() {
        return "UpdatePasswordDTO{" +
                "currentPassword='" + currentPassword + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", newPasswordConfirmation='" + newPasswordConfirmation + '\'' +
                '}';
    }

}
