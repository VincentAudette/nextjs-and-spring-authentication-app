package dto;

public class RechercheFilm {
    
    private String acteur;
    private String titre;
    private String realisateur;
    private int anneeBegin;
    private int anneeEnd;
    private String genre;
    private String pays;
    private String langue;
    private int firstResult;
    private int maxResult;

     // Getters
     public String getActeur() { return acteur; }
     public String getTitre() { return titre; }
     public String getRealisateur() {return realisateur;}
     public int getAnneeBegin() {return anneeBegin;}
     public int getAnneeEnd() {return anneeEnd;}
     public String getGenre() {return genre;}
     public String getPays() {return pays;}
     public String getLangue() {return langue;}
     public int getFirstResult() {return firstResult;}
     public int getMaxResult() {return maxResult;}

     // Setters
     public void setActeur(String acteur) { this.acteur = acteur;}
     public void setTitre(String titre) { this.titre = titre;}
     public void setRealisateur(String realisateur) { this.realisateur = realisateur; }
     public void setAnneeBegin(int anneeBegin) { this.anneeBegin = anneeBegin; }
     public void setAnneeEnd(int anneeEnd) { this.anneeEnd = anneeEnd; }
     public void setGenre(String genre) { this.genre = genre; }
     public void setPays(String pays) { this.pays = pays; }
     public void setLangue(String langue) { this.langue = langue; }
     public void setFirstResult(int firstResult) { this.firstResult = firstResult; }
     public void setMaxResult(int maxResult) { this.maxResult = maxResult; }
}
