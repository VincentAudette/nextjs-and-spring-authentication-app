import java.sql.*;
import java.util.ArrayList;
import java.util.Random;
public class Film {

    private static PreparedStatement stmtSelect;
    private static PreparedStatement stmtInsert; 
    private static PreparedStatement stmtFilmInsert; 

    private static String generatedScenaristeColumns[] = { "id_scenariste" };
    private static String generatedPaysColumns[] = { "id_pays" };
    private static String generatedGenresColumns[] = { "id_genre" };

    private static Random rand = new Random();

    public static void insertionFilm(int id_film, String titre, int annee,
            ArrayList<String> pays, String langue, int duree, String resume,
            ArrayList<String> genres, String realisateurNom, int realisateurId,
            ArrayList<String> scenaristes,
            ArrayList<Role> roles, String poster,
            ArrayList<String> annonces, Connection connection, PreparedStatement stmtFilm, 
            PreparedStatement stmtRole, PreparedStatement stmtInventaire, PreparedStatement stmtBandeAnnonce) throws SQLException {

        stmtFilm.setInt(1, id_film);
        stmtFilm.setInt(2, realisateurId);
        stmtFilm.setString(3, titre);
        stmtFilm.setInt(4, annee);
        stmtFilm.setString(5, langue);
        stmtFilm.setInt(6, duree);
        stmtFilm.setString(7, resume);
        stmtFilm.setString(8, poster);
        stmtFilm.execute();

        tableScenariste(scenaristes, id_film, connection);
        tableRole(roles, id_film, stmtRole);
        tablePays(pays, id_film, connection);
        tableGenres(genres, id_film, connection);
        tableInventaire(id_film, stmtInventaire);
        tableBandeAnnonce(annonces, id_film, stmtBandeAnnonce);
    }

    private static void tableScenariste(ArrayList<String> scenaristes, int id_film, Connection connection)
            throws SQLException {

        stmtSelect = connection.prepareStatement("SELECT ID_SCENARISTE FROM SCENARISTE WHERE NOM = ?");
        stmtInsert = connection.prepareStatement("INSERT INTO SCENARISTE VALUES (?,?)", generatedScenaristeColumns);
        stmtFilmInsert = connection.prepareStatement("INSERT INTO FILMSCENARISTE VALUES (?,?)");
        
        ResultSet rs;
        int id_scenariste = 0;

        for (String scenariste : scenaristes) {

            stmtSelect.setString(1, scenariste);
            rs = stmtSelect.executeQuery();
            if (rs.next()) {
                id_scenariste = rs.getInt(1);
            }

            if (id_scenariste == 0) {
                stmtInsert.setNull(1, Types.INTEGER);
                stmtInsert.setString(2, scenariste);

                stmtInsert.execute();
                rs = stmtInsert.getGeneratedKeys();
                rs.next();
                id_scenariste = rs.getInt(1);
            }

            stmtFilmInsert.setInt(1, id_scenariste);
            stmtFilmInsert.setInt(2, id_film);
            stmtFilmInsert.execute();
            id_scenariste = 0;
            rs = null;
        }

        stmtSelect.close();
        stmtInsert.close();
        stmtFilmInsert.close();
    }

    private static void tableRole(ArrayList<Role> roles, int id_film, PreparedStatement stmtRole) throws SQLException {

        for (Role role : roles) {
            stmtRole.setInt(1, id_film);
            stmtRole.setInt(2, role.id);
            stmtRole.setString(3, role.personnage);
            stmtRole.addBatch();
            stmtRole.clearParameters();
        }
    }

    private static void tablePays(ArrayList<String> pays, int id_film, Connection connection) throws SQLException {
        stmtSelect = connection.prepareStatement("SELECT ID_PAYS FROM PAYS WHERE NOM = ?");
        stmtInsert = connection.prepareStatement("INSERT INTO PAYS VALUES (?,?)", generatedPaysColumns);
        stmtFilmInsert = connection.prepareStatement("INSERT INTO FILMPAYS VALUES (?,?)");
        
        ResultSet rs;
        int id_pays = 0;

        for (String p : pays) {
            stmtSelect.setString(1, p);
            rs = stmtSelect.executeQuery();
            if (rs.next()) {
                id_pays = rs.getInt(1);
            }

            if (id_pays == 0) {
                stmtInsert.setNull(1, Types.INTEGER);
                stmtInsert.setString(2, p);

                stmtInsert.execute();
                rs = stmtInsert.getGeneratedKeys();
                rs.next();
                id_pays = rs.getInt(1);
            }

            stmtFilmInsert.setInt(1, id_pays);
            stmtFilmInsert.setInt(2, id_film);
            stmtFilmInsert.execute();

            id_pays = 0;
            rs = null;
        }

        stmtSelect.close();
        stmtInsert.close();
        stmtFilmInsert.close();
    }

    private static void tableGenres(ArrayList<String> genres, int id_film, Connection connection) throws SQLException {

        stmtSelect = connection.prepareStatement("SELECT ID_GENRE FROM GENRE WHERE GENRE = ?");
        stmtInsert = connection.prepareStatement("INSERT INTO GENRE VALUES (?,?)", generatedGenresColumns);
        stmtFilmInsert = connection.prepareStatement("INSERT INTO FILMGENRE VALUES (?,?)");
        
        ResultSet rs;
        int id_genre = 0;

        for (String genre : genres) {

            stmtSelect.setString(1, genre);
            rs = stmtSelect.executeQuery();
            if (rs.next()) {
                id_genre = rs.getInt(1);
            }

            if (id_genre == 0) {
                stmtInsert.setNull(1, Types.INTEGER);
                stmtInsert.setString(2, genre);

                stmtInsert.execute();
                rs = stmtInsert.getGeneratedKeys();
                rs.next();
                id_genre = rs.getInt(1);
            }

            stmtFilmInsert.setInt(1, id_genre);
            stmtFilmInsert.setInt(2, id_film);
            stmtFilmInsert.execute();

            id_genre = 0;
            rs = null;
        }

        stmtSelect.close();
        stmtInsert.close();
        stmtFilmInsert.close();
    }

    private static void tableInventaire(int id_film, PreparedStatement stmtInventaire) throws SQLException {
        int randomNum = rand.nextInt(100);

        stmtInventaire.setInt(1, id_film);
        stmtInventaire.setInt(2, randomNum);
        stmtInventaire.addBatch();
        stmtInventaire.clearParameters();
    }

    private static void tableBandeAnnonce(ArrayList<String> annonces, int id_film, PreparedStatement stmtBandeAnnonce) throws SQLException {

        for (String annonce : annonces) {
            stmtBandeAnnonce.setNull(1, Types.INTEGER);
            stmtBandeAnnonce.setInt(2, id_film);
            stmtBandeAnnonce.setString(3, annonce);
            stmtBandeAnnonce.addBatch();
            stmtBandeAnnonce.clearParameters();
        }
    }
}
