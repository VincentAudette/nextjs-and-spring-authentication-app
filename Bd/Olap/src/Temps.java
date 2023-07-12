import java.sql.*;
import java.util.Random;

public class Temps {
    
    public static void insertTemps(Connection connection) throws SQLException {
        //Attributs olap_Temps
        int heure, jour, mois, annee, jour_de_semaine;
        Date date_complete;

        //Variables de travail
        Random r = new Random();

        PreparedStatement ps = connection.prepareStatement("INSERT INTO olap_temps VALUES(?, ?, ?, ?, ?, ?, ?)");
        String query = "SELECT * FROM LOG6601C.COTES@NOM_LIEN";
        Statement s = connection.createStatement();
        ResultSet results = s.executeQuery(query);

        while (results.next()) {
            date_complete = results.getDate(4);
            heure = r.nextInt(24);
            jour = results.getDate(4).toLocalDate().getDayOfMonth();
            mois = results.getDate(4).toLocalDate().getMonthValue();
            annee = results.getDate(4).toLocalDate().getYear();
            jour_de_semaine = results.getDate(4).toLocalDate().getDayOfWeek().getValue();
            
            ps.setNull(1, Types.INTEGER); //Automatically generated
            ps.setDate(2, date_complete);
            ps.setInt(3, heure);
            ps.setInt(4, jour);
            ps.setInt(5, mois);
            ps.setInt(6, annee);
            ps.setInt(7, jour_de_semaine);
            ps.addBatch();
            ps.clearParameters();
        }

        ps.executeBatch();
        ps.close();
    }

}
