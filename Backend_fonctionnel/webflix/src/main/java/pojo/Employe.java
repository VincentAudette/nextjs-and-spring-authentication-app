package pojo;

import java.sql.Date;

public class Employe extends Utilisateur {

    private int matricule;

    public Employe() {}

    public Employe(int idUtilisateur, String nom, String courriel, String numTel, Date dateDeNaissance,
            String motDePasse, Adresse adresse, int matricule) {
        super(idUtilisateur, nom, courriel, numTel, dateDeNaissance, motDePasse, adresse);
        this.matricule = matricule;
    }

    // Getters
    public int getMatricule() { return matricule; }

    // Setters
    public void setMatricule(int matricule) { this.matricule = matricule; }
}
