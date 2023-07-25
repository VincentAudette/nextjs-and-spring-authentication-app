package com.git619.auth.utils;

public class RoleUtils {

    /**
     * Vérification de la validité du role.
     * Les rôles permis ici sont: (Voir la class Role)
     * 1. ADMINISTRATEUR
     * 2. PREPOSE_AUX_CLIENTS_RESIDENTIELS
     * 3. PREPOSE_AUX_CLIENTS_DAFFAIRE
     *
     */
    public static Role getRoleFromString(String role) throws IllegalArgumentException {
        Role roleEnum = Role.forValue(role);
        if (roleEnum == null) {
            throw new IllegalArgumentException("Invalid role");
        }
        return roleEnum;
    }
}
