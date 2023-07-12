package pojo;

import java.io.Serializable;
import java.sql.Date;

public class Utilisateur implements Serializable {

    private int idUtilisateur;
    private String nom;
    private String courriel;
    private String numTel;
    private Date dateDeNaissance;
    private String motDePasse;

    // Associations
    private Adresse adresse;

    protected Utilisateur() {}

    protected Utilisateur(int idUtilisateur, String nom, String courriel, String numTel,
                       Date dateDeNaissance, String motDePasse) {
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.courriel = courriel;
        this.numTel = numTel;
        this.dateDeNaissance = dateDeNaissance;
        this.motDePasse = motDePasse;
    }

    protected Utilisateur(int idUtilisateur, String nom, String courriel, String numTel,
                       Date dateDeNaissance, String motDePasse, Adresse adresse) {
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.courriel = courriel;
        this.numTel = numTel;
        this.dateDeNaissance = dateDeNaissance;
        this.motDePasse = motDePasse;
        this.adresse = adresse;
    }

    // Getters
    public int getIdUtilisateur() { return idUtilisateur; }
    public String getNom() { return nom; }
    public String getCourriel() { return courriel; }
    public String getNumTel() { return numTel; }
    public Date getDateDeNaissance() { return dateDeNaissance; }
    public String getMotDePasse() { return motDePasse; }
    public Adresse getAdresse() { return adresse; }

    // Setters
    public void setIdUtilisateur(int idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    public void setNom(String nom) { this.nom = nom; }
    public void setCourriel(String courriel) { this.courriel = courriel; }
    public void setNumTel(String numTel) { this.numTel = numTel; }
    public void setDateDeNaissance(Date dateDeNaissance) { this.dateDeNaissance = dateDeNaissance; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
    public void setAdresse(Adresse adresse) { this.adresse = adresse; }
}
