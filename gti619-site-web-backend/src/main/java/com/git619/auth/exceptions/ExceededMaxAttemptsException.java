package com.git619.auth.exceptions;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ExceededMaxAttemptsException extends RuntimeException {
    private final Date retryAfter;

    public ExceededMaxAttemptsException(Date retryAfter) {
        super("Vous avez dépassé le nombre maximal de tentatives de connexion. Veuillez réessayer après " + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(retryAfter) + ".");
        this.retryAfter = retryAfter;
    }

    public Date getRetryAfter() {
        return retryAfter;
    }
}

