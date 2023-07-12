package pojo;

import java.io.Serializable;

public class Scenariste implements Serializable {

    private int idScenariste;
    private String nom;

    public Scenariste() {}
    
    public Scenariste(int idScenariste, String nom) {
        this.idScenariste = idScenariste;
        this.nom = nom;
    }

    // Getters
    public int getIdScenariste() { return idScenariste; }
    public String getNom() { return nom; }

    // Setters
    public void setIdScenariste(int idScenariste) { this.idScenariste = idScenariste; }
    public void setNom(String nom) { this.nom = nom; }

}
