package com.git619.auth.exceptions;

public class PasswordUsedBeforeException extends RuntimeException {
    public PasswordUsedBeforeException() {
        super("Le nouveau mot de passe à été utilisé au paravant");
    }
}
