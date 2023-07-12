package pojo;

import java.sql.Date;

public class OlapTemps {
    private int idTemps;
    private Date dateComplete;
    private int heure;
    private int jour;
    private int mois;
    private int annee;
    private int jourDeSemaine;

    public OlapTemps() {

    }

    public OlapTemps(int idTemps, Date dateComplete, int heure, int jour, int mois, int annee, int jourDeSemaine) {
        this.idTemps = idTemps;
        this.dateComplete = dateComplete;
        this.heure = heure;
        this.jour = jour;
        this.mois = mois;
        this.annee = annee;
        this.jourDeSemaine = jourDeSemaine;
    }

    public int getIdTemps() { return idTemps; }
    public Date getDateComplete() { return dateComplete; }
    public int getHeure() { return heure; }
    public int getJour() { return jour; }
    public int getMois() { return mois; }
    public int getAnnee() { return annee;}
    public int getJourDeSemaine() { return jourDeSemaine; }

    public void setIdTemps(int idTemps) { this.idTemps = idTemps; }
    public void setDateComplete(Date dateComplete) { this.dateComplete = dateComplete; }
    public void setHeure(int heure) { this.heure = heure; }
    public void setJour(int jour) { this.jour = jour; }
    public void setMois(int mois) { this.mois = mois; }
    public void setAnnee(int annee) { this.annee = annee;}
    public void setJourDeSemaine(int jourDeSemaine) { this.jourDeSemaine = jourDeSemaine; }
}
