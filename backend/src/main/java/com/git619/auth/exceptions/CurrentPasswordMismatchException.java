package com.git619.auth.exceptions;

public class CurrentPasswordMismatchException extends RuntimeException {
    public CurrentPasswordMismatchException() {
        super("Mot de passe n'est pas identique à l'acutel");
    }
}
