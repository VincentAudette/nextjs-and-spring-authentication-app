package pojo;

import java.io.Serializable;

public class Forfait implements Serializable {

    private String codeForfait;
    private double cout;
    private int locationMax;
    private int dureeMax;
    private String categorieForfait;

    // Getters
    public String getCodeForfait() { return codeForfait; }
    public double getCout() { return cout; }
    public int getLocationMax() { return locationMax; }
    public int getDureeMax() { return dureeMax; }
    public String getCategorieForfait() { return categorieForfait; }

    // Setters
    public void setCodeForfait(String codeForfait) { this.codeForfait = codeForfait; }
    public void setCout(double cout) { this.cout = cout; }
    public void setLocationMax(int locationMax) { this.locationMax = locationMax; }
    public void setDureeMax(int dureeMax) { this.dureeMax = dureeMax; }
    public void setCategorieForfait(String categorieForfait) { this.categorieForfait = categorieForfait; }
}
