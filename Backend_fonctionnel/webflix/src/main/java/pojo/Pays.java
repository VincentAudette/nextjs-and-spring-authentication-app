package pojo;

import java.io.Serializable;

public class Pays implements Serializable {

    private int idPays;
    private String nom;

    public Pays() {}

    public Pays(int idPays, String nom) {
        this.idPays = idPays;
        this.nom = nom;
    }
    
    // Getters
    public int getIdPays() { return idPays; }
    public String getNom() { return nom; }

    // Setters
    public void setIdPays(int idPays) { this.idPays = idPays; }
    public void setNom(String nom) { this.nom = nom; }

}
