import java.sql.*;

public class Location {

    public static void insertLocation(Connection connection) throws SQLException {
        //Attributs olap_Location
        int fkClient, fkFilm, fkTemps, groupe_age_client, jour_de_semaine, mois;
        float cote;
        String province_client;

        PreparedStatement ps = connection.prepareStatement("INSERT INTO olap_location VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        String query = "SELECT * FROM LOG6601C.COTES@NOM_LIEN";
        Statement s = connection.createStatement();
        ResultSet results = s.executeQuery(query);
        ResultSet resultsTemps, resultsClient;

        while (results.next()) {
            fkClient = results.getInt(2);
            fkFilm = results.getInt(1);

            //Info sur le temps de la location
            Date dateEmprunt = results.getDate(4);
            int day = dateEmprunt.toLocalDate().getDayOfMonth();
            int month = dateEmprunt.toLocalDate().getMonthValue();
            int year = dateEmprunt.toLocalDate().getYear();

            String queryTemps = "SELECT * FROM olap_temps WHERE JOUR = " + day + " AND MOIS = " + month + " AND ANNEE = " + year;
            Statement statementTemps = connection.createStatement();
            resultsTemps = statementTemps.executeQuery(queryTemps);
            resultsTemps.next();

            fkTemps = resultsTemps.getInt(1);
            jour_de_semaine = resultsTemps.getInt(7);
            mois = resultsTemps.getInt(5);

            statementTemps.close();

            //Info sur le client qui a fait la location
            String queryClient = "SELECT * FROM olap_client WHERE ID_CLIENT = '" + fkClient + "'";
            Statement statementClient = connection.createStatement();
            resultsClient = statementClient.executeQuery(queryClient);
            resultsClient.next();

            groupe_age_client = resultsClient.getInt(3);
            province_client = resultsClient.getString(7);

            statementClient.close();

            //Info sur la cote
            cote = results.getInt(3);

            //PreparedStatement
            ps.setNull(1, Types.INTEGER); //Automatically generated
            ps.setInt(2, fkFilm);
            ps.setInt(3, fkClient);
            ps.setInt(4, fkTemps);
            ps.setFloat(5, cote);
            ps.setInt(6, groupe_age_client);
            ps.setString(7, province_client);
            ps.setInt(8, jour_de_semaine);
            ps.setInt(9, mois);

            ps.addBatch();
            ps.clearParameters();
        }

        ps.executeBatch();
        ps.close();
        s.close();
    }
}
