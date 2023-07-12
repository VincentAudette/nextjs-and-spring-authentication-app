package dto;

public class Login {
    
    private String courriel;
    private String motDePasse;

     // Getters
     public String getCourriel() { return courriel; }
     public String getMotDePasse() { return motDePasse; }
 
     // Setters
     public void setEmail(String courriel) { this.courriel = courriel; }
     public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
}
