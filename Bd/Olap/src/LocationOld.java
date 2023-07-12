import java.sql.*;

public class LocationOld {

    public static void insertLocation(Connection connection) throws SQLException {
        //Attributs olap_Location
        int fkClient, fkFilm, fkTemps, groupe_age_client, jour_de_semaine, mois;
        float cote;
        String province_client;

        PreparedStatement ps = connection.prepareStatement("INSERT INTO olap_location VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
        String query = "SELECT * FROM location";
        Statement s = connection.createStatement();
        ResultSet results = s.executeQuery(query);
        ResultSet resultsTemps, resultsClient;

        while (results.next()) {
            fkClient = results.getInt(3);
            fkFilm = results.getInt(2);

            //Info sur le temps de la location
            resultsTemps = getInfoTemps(connection, results.getDate(6));
            resultsTemps.next();

            fkTemps = resultsTemps.getInt(1);
            jour_de_semaine = resultsTemps.getInt(7);
            mois = resultsTemps.getInt(5);

            //Info sur le client qui a fait la location
            resultsClient = getInfoClient(connection, fkClient);
            resultsClient.next();

            groupe_age_client = resultsClient.getInt(3);
            province_client = resultsClient.getString(7);

            cote = getCote(connection, fkClient, fkFilm);

            //PreparedStatement
            ps.setInt(1, fkFilm);
            ps.setInt(2, fkClient);
            ps.setInt(3, fkTemps);
            ps.setFloat(4, cote);
            ps.setInt(5, groupe_age_client);
            ps.setString(6, province_client);
            ps.setInt(7, jour_de_semaine);
            ps.setInt(8, mois);

            ps.addBatch();
            ps.clearParameters();
        }

        ps.executeBatch();
        ps.close();
    }

    private static ResultSet getInfoTemps(Connection conn, Date dateEmprunt) throws SQLException {
        //Doesn't work because Dates in Oracle are stupid
        //String query = "SELECT * FROM olap_temps WHERE DATE_COMPLETE = '" + dateEmprunt + "'";
        
        int day = dateEmprunt.toLocalDate().getDayOfMonth();
        int month = dateEmprunt.toLocalDate().getMonthValue();
        int year = dateEmprunt.toLocalDate().getYear();

        String query = "SELECT * FROM olap_temps WHERE JOUR = " + day + " AND MOIS = " + month + " AND ANNEE = " + year;
        Statement s = conn.createStatement();
        return s.executeQuery(query);
    }

    private static ResultSet getInfoClient(Connection conn, int idClient) throws SQLException {
        String query = "SELECT * FROM olap_client WHERE ID_CLIENT = '" + idClient + "'";
        Statement s = conn.createStatement();
        return s.executeQuery(query);
    }

    private static float getCote(Connection conn, int idClient, int idFilm) throws SQLException {
        String query = "SELECT * FROM LOG6601C.COTES@NOM_LIEN WHERE IDFILM = " + idFilm + " AND IDCLIENT = " + idClient;
        Statement s = conn.createStatement();
        ResultSet results = s.executeQuery(query);

        while (results.next()) {
            return results.getInt(3);
        }
        
        //Client n'a pas fait de cote sur ce film.
        System.out.println("Client: " + idClient + " - Film: " + idFilm + " = Pas de cote");
        return 0f;
    }
}
