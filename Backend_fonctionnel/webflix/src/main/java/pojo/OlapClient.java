package pojo;

import java.sql.Date;

public class OlapClient {
    private int idClient;
    private String nom;
    private int groupeAge;
    private Date anciennete;
    private String codePostal;
    private String ville;
    private String province;

    public OlapClient() {

    }

    public OlapClient(int idClient, String nom, int groupeAge, Date anciennete, String codePostal, String ville, String province) {
        this.idClient = idClient;
        this.nom = nom;
        this.groupeAge = groupeAge;
        this.anciennete = anciennete;
        this.codePostal = codePostal;
        this.ville = ville; 
        this.province = province;
    }

    public int getIdClient() { return idClient;}
    public String getNom() { return nom;}
    public int getGroupeAge() { return groupeAge; }
    public Date getAnciennete() { return anciennete; }
    public String getCodePostal() { return codePostal; }
    public String getVille() { return ville; }
    public String getProvince() { return province; }

    
    public void setIdClient(int idClient) {  this.idClient = idClient;}
    public void setNom(String nom) { this.nom = nom;}
    public void setGroupeAge(int groupeAge) { this.groupeAge = groupeAge; }
    public void setAnciennete(Date anciennete) { this.anciennete = anciennete; }
    public void setCodePostal(String codePostal) { this.codePostal = codePostal; }
    public void setVille(String ville) { this.ville = ville; }
    public void setProvince(String province) { this.province = province; }
}
