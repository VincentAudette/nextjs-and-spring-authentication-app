package com.git619.auth.exceptions;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(String validationMessage) {
        super(validationMessage);
    }
}