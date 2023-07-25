package com.git619.auth.utils;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    ADMINISTRATEUR("Administrateur"),
    PREPOSE_AUX_CLIENTS_RESIDENTIELS("Préposé aux clients résidentiels"),
    PREPOSE_AUX_CLIENTS_DAFFAIRE("Préposé aux clients d'affaire");

    private String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // This method will be used by Jackson during deserialization
    @JsonCreator
    public static Role forValue(String value) {
        for (Role role : Role.values()) {
            if (role.getValue().equalsIgnoreCase(value)) {
                return role;
            }
        }
        return null;
    }
}
