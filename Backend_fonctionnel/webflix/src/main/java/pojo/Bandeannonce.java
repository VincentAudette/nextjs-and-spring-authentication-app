package pojo;

import java.io.Serializable;

public class Bandeannonce implements Serializable {

    private int idBandeannonce;
    private String lien;

    public Bandeannonce() {}

    public Bandeannonce(int idBandeannonce, String lien) {
        this.idBandeannonce = idBandeannonce;
        this.lien = lien;
    }

    // Getters
    public int getIdBandeannonce() { return idBandeannonce; }
    public String getLien() { return lien; }

    // Setters
    public void setIdBandeannonce(int idBandeannonce) { this.idBandeannonce = idBandeannonce; }
    public void setLien(String lien) { this.lien = lien; }

}
