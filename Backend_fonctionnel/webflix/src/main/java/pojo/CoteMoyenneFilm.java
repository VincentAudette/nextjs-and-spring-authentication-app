package pojo;

public class CoteMoyenneFilm {
    private int idFilm;
    private double coteAvg;

    public CoteMoyenneFilm() { }

    public CoteMoyenneFilm(int idFilm, double coteAvg) {
        this.idFilm = idFilm;
        this.coteAvg = coteAvg;
    }

    public int getIdFilm() { return idFilm; }
    public double getCoteAvg() { return coteAvg; }

    public void setIdFilm(int idFilm) { this.idFilm = idFilm; }
    public void setCoteAvg(double coteAvg) { this.coteAvg = coteAvg; } 
}

