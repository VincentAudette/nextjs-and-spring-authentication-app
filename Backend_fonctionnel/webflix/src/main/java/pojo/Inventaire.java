package pojo;

import java.io.Serializable;

public class Inventaire implements Serializable {

    private int idFilm;
    private int quantite;

    public Inventaire() {}

    public Inventaire(int idFilm, int quantite) {
        this.idFilm = idFilm;
        this.quantite = quantite;
    }

    // Getters
    public int getIdFilm() { return idFilm; }
    public int getQuantite() { return quantite; }

    // Setters
    public void setIdFilm(int idFilm) { this.idFilm = idFilm; }
    public void setQuantite(int quantite) { this.quantite = quantite; }
}
