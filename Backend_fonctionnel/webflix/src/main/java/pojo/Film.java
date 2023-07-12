package pojo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class Film implements Serializable {

    private int idFilm;
    private String titre;
    private int annee;
    private String langue;
    private int duree;
    private String resume;
    private String affiche;

    // Association
    private Personne realisateur;
    private Set<Personne> acteurs = new HashSet<Personne>();
    private Set<Scenariste> scenaristes = new HashSet<Scenariste>();
    private Set<Pays> pays = new HashSet<Pays>();
    private Set<Genre> genres = new HashSet<Genre>();
    private Set<Bandeannonce> bandeAnnonces = new HashSet<Bandeannonce>();

    public Film() {}

    public Film(int idFilm, String titre, int annee, String langue, int duree, String resume, String affiche) {
        this.idFilm = idFilm;
        this.titre = titre;
        this.annee = annee;
        this.langue = langue;
        this.duree = duree;
        this.resume = resume;
        this.affiche = affiche;
    }

    public Film(int idFilm, String titre, Personne realisateur, int annee, String langue, int duree, String resume, String affiche,
                Set<Personne> acteurs, Set<Scenariste> scenaristes, Set<Pays> pays, Set<Genre> genres) {
        this.idFilm = idFilm;
        this.titre = titre;
        this.realisateur = realisateur;
        this.annee = annee;
        this.langue = langue;
        this.duree = duree;
        this.resume = resume;
        this.affiche = affiche;
        this.acteurs = acteurs;
        this.scenaristes = scenaristes;
        this.pays = pays;
        this.genres = genres;
    }

    //Avec Bande-annonces pour les points bonis
    public Film(int idFilm, String titre, Personne realisateur, int annee, String langue, int duree, String resume, String affiche,
                Set<Personne> acteurs, Set<Scenariste> scenaristes, Set<Pays> pays, Set<Genre> genres, Set<Bandeannonce> bandeAnnonces) {
        this.idFilm = idFilm;
        this.titre = titre;
        this.realisateur = realisateur;
        this.annee = annee;
        this.langue = langue;
        this.duree = duree;
        this.resume = resume;
        this.affiche = affiche;
        this.acteurs = acteurs;
        this.scenaristes = scenaristes;
        this.pays = pays;
        this.genres = genres;
        this.bandeAnnonces = bandeAnnonces;
    }

    // Getters
    public int getIdFilm() { return idFilm; }
    public Personne getRealisateur() { return realisateur; }
    public String getTitre() { return titre; }
    public int getAnnee() { return annee; }
    public String getLangue() { return langue; }
    public int getDuree() { return duree; }
    public String getResume() { return resume; }
    public String getAffiche() { return affiche; }
    public Set<Personne> getActeurs() { return acteurs; }
    public Set<Scenariste> getScenaristes() { return scenaristes; }
    public Set<Pays> getPays() { return pays; }
    public Set<Genre> getGenres() { return genres; }
    public Set<Bandeannonce> getBandeAnnonces() { return this.bandeAnnonces; }

    // Setters
    public void setIdFilm(int idFilm) { this.idFilm = idFilm; }
    public void setRealisateur(Personne realisateur) { this.realisateur = realisateur; }
    public void setTitre(String titre) { this.titre = titre; }
    public void setAnnee(int annee) { this.annee = annee; }
    public void setLangue(String langue) { this.langue = langue; }
    public void setDuree(int duree) { this.duree = duree; }
    public void setResume(String resume) { this.resume = resume; }
    public void setAffiche(String affiche) { this.affiche = affiche; }
    public void setActeurs(Set<Personne> acteurs) { this.acteurs = acteurs; }
    public void setScenaristes(Set<Scenariste> scenaristes) { this.scenaristes = scenaristes; }
    public void setPays(Set<Pays> pays) { this.pays = pays; }
    public void setGenres(Set<Genre> genres) { this.genres = genres; }
    public void setBandeAnnonce(Set<Bandeannonce> bandeAnnonces) { this.bandeAnnonces = bandeAnnonces; }

}
