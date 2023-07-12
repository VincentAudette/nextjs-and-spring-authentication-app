package Olap.src;
import java.sql.*;
import java.time.LocalDate;

public class Client {
    
    private static final LocalDate NULL_DATE = LocalDate.parse("3000-01-01");

    public static void insertClient(Connection connection) throws SQLException {
        //Attributs olap_Client
        int id_client = 0, groupe_age = 0;
        String nom = null, code_postal = null, ville = null, province = null;
        Date anciennete = null;

        //Variables de travail
        int anneeDeNaissance = 0;
        int cetteAnnee = LocalDate.now().getYear();
        LocalDate plusAncienne = null;

        PreparedStatement ps = connection.prepareStatement("INSERT INTO olap_client VALUES(?, ?, ?, ?, ?, ?, ?)");
        String query = "SELECT * FROM utilisateur NATURAL JOIN adresse";
        Statement s = connection.createStatement();
        ResultSet results = s.executeQuery(query);

        while (results.next()) {
            //Pour les colonnes de la table olap_client
            id_client = results.getInt(1);
            nom = results.getString(2);
            code_postal = results.getString(11);
            ville = results.getString(9);
            province = results.getString(10);

            //Pour le groupe d'âge --- 1-5 = 5, 6-10 = 10, etc.
            anneeDeNaissance = results.getDate(5).toLocalDate().getYear();
            groupe_age = Math.floorDiv((cetteAnnee - anneeDeNaissance), 5) * 5;

            //Pour l'anciennete
            plusAncienne = getAnciennete(connection, id_client);
            anciennete = (plusAncienne == NULL_DATE ? null : Date.valueOf(plusAncienne));

            //Add to preparedStatement
            ps.setInt(1, id_client);
            ps.setString(2, nom);
            ps.setInt(3, groupe_age);
            ps.setDate(4, anciennete);
            ps.setString(5, code_postal);
            ps.setString(6, ville);
            ps.setString(7, province);
            ps.addBatch();
            ps.clearParameters();
        }

        ps.executeBatch();
        ps.close();
        
    }

    //Might wanna only make one SELECT call.
    private static LocalDate getAnciennete(Connection conn, int id) throws SQLException {
        String query = "SELECT id_utilisateur, date_emprunt FROM Location WHERE id_utilisateur = " + id;
        Statement s = conn.createStatement();
        ResultSet results = s.executeQuery(query);
        
        LocalDate plusAncienne = NULL_DATE;
        LocalDate dateLocation = null;

        while (results.next()) {
            dateLocation = results.getDate(2).toLocalDate();
            if (dateLocation.isBefore(plusAncienne))
                plusAncienne = dateLocation;
        }
        s.close();
        return plusAncienne;
    }

}
//ID_UTILISATEUR
        //NOM
        //COURRIEL
        //NUM_TEL
        //DATE_DE_
        //MOT_DE_PASSE
        //NUMERO_CIVIQUE
        //RUE
        //VILLE
        //PROVINCE
        //CODE_P
