package pojo;

import java.io.Serializable;

public class OlapFilm implements Serializable {
    
    private int idFilm;
    private String titre;
    private int anneeSortie; 
    private int pays;
    private int action;
    private int adventure;
    private int comedy;
    private int family;
    private int romance;
    private int drama;
    private int animation;
    private int fantasy;
    private int biography;
    private int thriller;
    private int sciFi;
    private int crime;
    private int sport;
    private int horror;
    private int filmNoir;
    private int mystery;
    private int western;
    private int war;
    private int musical;
    private int documentary;
    private int history;
    private int music;

    public OlapFilm() {

    }

    public OlapFilm(int idFilm, String titre, int anneeSortie, int pays, int action, int adventure, int comedy, int family, int romance, int drama, int animation, int fantasy, int biography, int thriller, int sciFi, int crime, int sport, int horror, int filmNoir, int mystery, int western, int war, int musical, int documentary, int history, int music) {
        this.idFilm = idFilm;
        this.titre = titre;
        this.anneeSortie = anneeSortie;
        this.pays = pays;
        this.action = action;
        this.adventure = adventure;
        this.comedy = comedy;
        this.family = family;
        this.romance = romance;
        this.drama = drama;
        this.animation = animation;
        this.fantasy = fantasy;
        this.biography = biography;
        this.thriller = thriller;
        this.sciFi = sciFi;
        this.crime = crime;
        this.sport = sport;
        this.horror = horror;
        this.filmNoir = filmNoir;
        this.mystery = mystery;
        this.western = western;
        this.war = war;
        this.musical = musical;
        this.documentary = documentary;
        this.history = history;
        this.music = music;
    }

    public int getIdFilm() { return idFilm; }
    public String getTitre() { return titre; }
    public int getAnneeSortie() { return anneeSortie;}
    public int getPays() { return pays; }
    public int getAction() { return action; }
    public int getAdventure() { return adventure; }
    public int getComedy() {return comedy; }
    public int getFamily() { return family; }
    public int getRomance() { return romance; }
    public int getDrama() { return drama; }
    public int getAnimation() { return animation; }
    public int getFantasy() { return fantasy; }
    public int getBiography() { return biography; }
    public int getThriller() { return thriller; }
    public int getSciFi() { return sciFi; }
    public int getCrime() { return crime; }
    public int getSport() { return sport; }
    public int getHorror() { return horror; }
    public int getFilmNoir() { return filmNoir; }
    public int getMystery() { return mystery; }
    public int getWestern() { return western; }
    public int getWar() { return war; }
    public int getMusical() { return musical; }
    public int getDocumentary() { return documentary; }
    public int getHistory() { return history; }
    public int getMusic() { return music; }
    
    public void setIdFilm(int idFilm) { this.idFilm = idFilm; }
    public void setTitre(String titre) { this.titre = titre; }
    public void setAnneeSortie(int anneeSortie) { this.anneeSortie = anneeSortie; }
    public void setPays(int pays) { this.pays = pays; }
    public void setAction(int action) { this.action = action; }
    public void setAdventure(int adventure) { this.adventure = adventure; }
    public void setComedy(int comedy) { this.comedy = comedy; }
    public void setFamily(int family) { this.family = family; }
    public void setRomance(int romance) { this.romance = romance; }
    public void setDrama(int drama) { this.drama = drama; }
    public void setAnimation(int animation) { this.animation = animation; }
    public void setFantasy(int fantasy) { this.fantasy = fantasy; }
    public void setBiography(int biography) { this.biography = biography; }
    public void setThriller(int thriller) { this.thriller = thriller; }
    public void setSciFi(int sciFi) { this.sciFi = sciFi; }
    public void setCrime(int crime) { this.crime = crime; }
    public void setSport(int sport) { this.sport = sport; }
    public void setHorror(int horror) { this.horror = horror; }
    public void setFilmNoir(int filmNoir) { this.filmNoir = filmNoir; }
    public void setMystery(int mystery) { this.mystery = mystery; }
    public void setWestern(int western) { this.western = western; }
    public void setWar(int war) { this.war = war; }
    public void setMusical(int musical) { this.musical = musical; }
    public void setDocumentary(int documentary) {this.documentary = documentary; }
    public void setHistory(int history) { this.history = history; }
    public void setMusic(int music) { this.music = music; }
}
