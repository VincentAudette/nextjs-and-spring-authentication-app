import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Personne {

    public static void insertionPersonne(int id, String nom, String anniv, String lieu, String photo, String bio,
            PreparedStatement statement) throws SQLException {

        // If the string anniv is null, do not try to parse it.
        Date annivParsed = (anniv == null ? null : Date.valueOf(anniv));

        statement.setInt(1, id);
        statement.setString(2, nom);
        statement.setDate(3, annivParsed);
        statement.setString(4, lieu);
        statement.setString(5, photo);
        statement.setString(6, bio);
        statement.setNull(7, 0); // UNUSED AS OF NOW
        statement.addBatch();
        statement.clearParameters();
    }
}
