package pojo;

import java.io.Serializable;

public class Cartedecredit implements Serializable {

    private int idUtilisateur;
    private String noCarte;
    private String typeCarte;
    private int expMois;
    private int expAnnee;
    private int cvv;

    public Cartedecredit() {}

    public Cartedecredit(int idUtilisateur, String noCarte, String typeCarte, int expMois,
                         int expAnnee, int cvv) {
        this.idUtilisateur = idUtilisateur;
        this.noCarte = noCarte;
        this.typeCarte = typeCarte;
        this.expMois = expMois;
        this.expAnnee = expAnnee;
        this.cvv = cvv;
    }

    // Getters
    public int getIdUtilisateur() { return idUtilisateur; }
    public String getNoCarte() { return noCarte; }
    public String getTypeCarte() { return typeCarte; }
    public int getExpMois() { return expMois; }
    public int getExpAnnee() { return expAnnee; }
    public int getCvv() { return cvv; }

    // Setters
    public void setIdUtilisateur(int idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    public void setNoCarte(String noCarte) { this.noCarte = noCarte; }
    public void setTypeCarte(String typeCarte) { this.typeCarte = typeCarte; }
    public void setExpMois(int expMois) { this.expMois = expMois; }
    public void setExpAnnee(int expAnnee) { this.expAnnee = expAnnee; }
    public void setCvv(int cvv) { this.cvv = cvv; }
}
