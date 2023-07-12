package pojo;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

public class Client extends Utilisateur {

    // Associations
    private Forfait forfait;
    private Cartedecredit carteDeCredit;
    private Set<Location> locations = new HashSet<Location>();

    public Client() {}

    public Client(int idUtilisateur, String nom, String courriel, String numTel,
                  Date dateDeNaissance, String motDePasse, Adresse adresse, Forfait forfait,
                  Cartedecredit carteDeCredit, Set<Location> locations) {
        super(idUtilisateur, nom, courriel, numTel, dateDeNaissance, motDePasse, adresse);
        this.forfait = forfait;
        this.carteDeCredit = carteDeCredit;
        this.locations = locations;
    }

    public void addLocation(Location newLocation) { locations.add(newLocation); }
    public void removeLocation(Location locationToRemove) { locations.remove(locationToRemove); }

    // Getters
    public Forfait getForfait() { return forfait; }
    public Cartedecredit getCarteDeCredit() { return carteDeCredit; }
    public Set<Location> getLocations() { return locations; }

    // Setters
    public void setForfait(Forfait forfait) { this.forfait = forfait; }
    public void setCarteDeCredit(Cartedecredit carteDeCredit) { this.carteDeCredit = carteDeCredit; }
    public void setLocations(Set<Location> locations) { this.locations = locations; }
}
