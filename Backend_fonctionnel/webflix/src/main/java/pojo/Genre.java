package pojo;

import java.io.Serializable;

public class Genre implements Serializable {

    private int idGenre;
    private String genre;

    public Genre() {}

    public Genre(int idGenre, String genre) {
        this.idGenre = idGenre;
        this.genre = genre;
    }

    // Getters
    public int getIdGenre() { return idGenre; }
    public String getGenre() { return genre; }

    // Setters
    public void setIdGenre(int idGenre) { this.idGenre = idGenre; }
    public void setGenre(String genre) { this.genre = genre; }

}
