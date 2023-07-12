package pojo;

import java.io.Serializable;

public class OlapLocation implements Serializable {

    private int idLocation;
    private int temps;
    private int cote;
    private int groupeAgeClient;
    private String provinceClient;
    private int jourDeSemaine;
    private int mois;

    // Association
    private OlapFilm olapFilm;
    private OlapClient olapClient;
    private OlapTemps olapTemps;

    public OlapLocation() {}

    public OlapLocation(OlapFilm olapFilm, OlapClient olapClient, OlapTemps olapTemps, int temps, int cote, int groupeAgeClient, String provinceClient, int jourDeSemaine, int mois) {
        this.olapFilm = olapFilm;
        this.olapClient = olapClient;
        this.olapTemps = olapTemps;
        this.temps = temps;
        this.cote = cote;
        this.groupeAgeClient = groupeAgeClient;
        this.jourDeSemaine = jourDeSemaine;
        this.mois = mois;
    }

    // Getters
    public int getIdLocation() { return idLocation; }
    public OlapFilm getOlapFilm() { return olapFilm; }
    public OlapClient getOlapClient() { return olapClient; }
    public OlapTemps getOlapTemps() { return olapTemps; }
    public int getTemps() { return temps; }
    public int getCote() { return cote; }
    public int getGroupeAgeClient() { return groupeAgeClient; }
    public String getProvinceClient() { return provinceClient; }
    public int getJourDeSemaine() { return jourDeSemaine; }
    public int getMois() { return mois; }

    // Setters
    public void setIdLocation(int idLocation) { this.idLocation = idLocation; }
    public void setOlapFilm(OlapFilm olapFilm) { this.olapFilm = olapFilm; }
    public void setOlapClient(OlapClient olapClient) { this.olapClient = olapClient; }
    public void setOlapTemps(OlapTemps olapTemps) { this.olapTemps = olapTemps; }
    public void setTemps(int temps) { this.temps = temps; }
    public void setCote(int cote) { this.cote = cote; }
    public void setGroupeAgeClient(int groupeAgeClient) { this.groupeAgeClient = groupeAgeClient; }
    public void setProvinceClient(String provinceClient) { this.provinceClient = provinceClient; }
    public void setJourDeSemaine(int jourDeSemaine) { this.jourDeSemaine = jourDeSemaine; }
    public void setMois(int mois) { this.mois = mois; }
}
