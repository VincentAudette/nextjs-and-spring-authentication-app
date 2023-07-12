package pojo;

import java.io.Serializable;
import java.sql.Date;

public class Personne implements Serializable {
    private int idPersonne;
    private String nomPersonne;
    private Date dateNaissance;
    private String lieuNaissance;
    private String photo;
    private String bio;
    private String categoriePersonne;

    public Personne() {}

    public Personne(int idPersonne, String nomPersonne, Date dateNaissance, String lieuNaissance,
                    String photo, String bio, String categoriePersonne) {
        this.idPersonne = idPersonne;
        this.nomPersonne = nomPersonne;
        this.dateNaissance = dateNaissance;
        this.lieuNaissance = lieuNaissance;
        this.photo = photo;
        this.bio = bio;
        this.categoriePersonne = categoriePersonne;
    }

    // Getters
    public int getIdPersonne() { return idPersonne; }
    public String getNomPersonne() { return nomPersonne; }
    public Date getDateNaissance() { return dateNaissance; }
    public String getLieuNaissance() { return lieuNaissance; }
    public String getPhoto() { return photo; }
    public String getBio() { return bio; }
    public String getCategoriePersonne() { return categoriePersonne; }

    // Setters
    public void setIdPersonne(int idPersonne) { this.idPersonne = idPersonne; }
    public void setNomPersonne(String nomPersonne) { this.nomPersonne = nomPersonne; }
    public void setDateNaissance(Date dateNaissance) { this.dateNaissance = dateNaissance; }
    public void setLieuNaissance(String lieuNaissance) { this.lieuNaissance = lieuNaissance; }
    public void setPhoto(String photo) { this.photo = photo; }
    public void setBio(String bio) { this.bio = bio; }
    public void setCategoriePersonne(String categoriePersonne) { this.categoriePersonne = categoriePersonne; }
}
