package pojo;

import java.io.Serializable;

public class CorrelationFilm implements Serializable {
    private int idFilmJ;
    private int idFilmK;
    private double correlationFilm;

    public CorrelationFilm() { }

    public CorrelationFilm(int idFilmJ, int idFilmK, double correlationFilm) {
        this.idFilmJ = idFilmJ;
        this.idFilmK = idFilmK;
        this.correlationFilm = correlationFilm;
    }

    public int getIdFilmJ() { return idFilmJ; }
    public int getIdFilmK() { return idFilmK; }
    public double getCorrelation() { return correlationFilm; }

    public void setIdFilmJ(int idFilmJ) { this.idFilmJ = idFilmJ; }
    public void setIdFilmK(int idFilmK) { this.idFilmK = idFilmK; }
    public void setCorrelation(double correlationFilm) { this.correlationFilm = correlationFilm; } 
}

