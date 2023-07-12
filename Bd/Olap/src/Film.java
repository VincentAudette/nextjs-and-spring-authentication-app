package Olap.src;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class Film {
    
    public static void insertFilm(Connection connection) throws SQLException {
        String titre = "null";
        int anneeSortie = 0;
        int pays = 0;
        int[] genres;

        PreparedStatement insertFilm = connection.prepareStatement("INSERT INTO olap_Film VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        String query = "SELECT * FROM film";
        Statement filmS = connection.createStatement();
        ResultSet filmResults = filmS.executeQuery(query);

        while (filmResults.next()) {
            genres = new int[22];
            int idFilm = filmResults.getInt(1); //id
            titre = filmResults.getString(3); //tire
            anneeSortie = Integer.parseInt(filmResults.getString(4));
            
            ajoutGenres(connection, idFilm, genres);
            pays = ajoutPays(connection, idFilm, pays);

            //Add to preparedStatement
            insertFilm.setInt(1, idFilm);
            insertFilm.setString(2, titre);
            insertFilm.setInt(3, anneeSortie);
            insertFilm.setInt(4, pays);
            
            for(int i = 0; i < genres.length; i++) {
                insertFilm.setInt(i + 5, genres[i]);
            }

            insertFilm.addBatch();
            insertFilm.clearParameters();
        }
        
        insertFilm.executeBatch();
        insertFilm.close();
    }

    public static void ajoutGenres(Connection connection,int idFilm, int[] genres) throws SQLException {
        
        String query = String.format("SELECT * FROM filmgenre where id_film = %s", idFilm);
        Statement genreStat = connection.createStatement();
        ResultSet genreResults = genreStat.executeQuery(query);

        int indexGenre = 0;

        while(genreResults.next()) {
            indexGenre = genreResults.getInt(1);
            genres[indexGenre - 1] = 1;
        }

        genreStat.close();
    }

    public static int ajoutPays(Connection connection, int idFilm, int pays) throws SQLException {
        
        String query = String.format("SELECT * FROM filmpays where id_film = %s", idFilm);
        Statement paysStat = connection.createStatement();
        ResultSet paysResults = paysStat.executeQuery(query);

        int isPaysUSA = 0;

        while(paysResults.next()) {
            isPaysUSA = paysResults.getInt(1);   
            if (isPaysUSA == 1) {
                paysResults.close();
                return 1;
            }
        }

        paysResults.close();
        return 0;
    }
}
