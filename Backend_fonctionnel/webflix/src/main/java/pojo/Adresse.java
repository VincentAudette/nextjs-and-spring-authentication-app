package pojo;

import java.io.Serializable;

public class Adresse implements Serializable {

    private int idUtilisateur;
    private int numeroCivique;
    private String rue;
    private String ville;
    private String province;
    private String codePostal;

    public Adresse () {}

    public Adresse (int idUtilisateur, int numeroCivique, String rue, String ville,
                    String province, String codePostal) {
        this.idUtilisateur = idUtilisateur;
        this.numeroCivique = numeroCivique;
        this.rue = rue;
        this.ville = ville;
        this.province = province;
        this.codePostal = codePostal;
    }

    // Getters
    public int getIdUtilisateur() { return idUtilisateur; }
    public int getNumeroCivique() { return numeroCivique; }
    public String getRue() { return rue; }
    public String getVille() { return ville; }
    public String getProvince() { return province; }
    public String getCodePostal() { return codePostal; }

    // Setters
    public void setIdUtilisateur(int idUtilisateur) {this.idUtilisateur = idUtilisateur; }
    public void setNumeroCivique(int numeroCivique) { this.numeroCivique = numeroCivique; }
    public void setRue(String rue) { this.rue = rue; }
    public void setVille(String ville) { this.ville = ville; }
    public void setProvince(String province) { this.province = province; }
    public void setCodePostal(String codePostal) { this.codePostal = codePostal; }
}
 