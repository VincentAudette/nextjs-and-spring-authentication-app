package com.git619.auth.exceptions;

public class PasswordConfirmationMismatchException extends RuntimeException {
    public PasswordConfirmationMismatchException() {
        super("La confirmation de mot de passe n'est pas identique que le nouveau mot de passe");
    }
}
