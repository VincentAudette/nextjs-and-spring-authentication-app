package pojo;

import java.sql.Date;
import java.io.Serializable;

public class Location implements Serializable {

    private int idLocation;
    private Date dateDeRetour;
    private Date dateARetourner;
    private Date dateEmprunt;

    // Association
    private Film film;
    private Utilisateur utilisateur;

    public Location() {}

    public Location(int idLocation, Film film, Utilisateur utilisateur, Date dateDeRetour, Date dateARetourner,
                    Date dateEmprunt) {
        this.idLocation = idLocation;
        this.film = film;
        this.utilisateur = utilisateur;
        this.dateDeRetour = dateDeRetour;
        this.dateARetourner = dateARetourner;
        this.dateEmprunt = dateEmprunt;
    }

    // Getters
    public int getIdLocation() { return idLocation; }
    public Film getFilm() { return film; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public Date getDateDeRetour() { return dateDeRetour; }
    public Date getDateARetourner() { return dateARetourner; }
    public Date getDateEmprunt() { return dateEmprunt; }

    // Setters
    public void setIdLocation(int idLocation) { this.idLocation = idLocation; }
    public void setFilm(Film film) { this.film = film; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    public void setDateDeRetour(Date dateDeRetour) { this.dateDeRetour = dateDeRetour; }
    public void setDateARetourner(Date dateARetourner) { this.dateARetourner = dateARetourner; }
    public void setDateEmprunt(Date dateEmprunt) { this.dateEmprunt = dateEmprunt; }
}
