package Olap.src;
import java.sql.*;

public class OLAP { 

    private static Connection connection = null;

    private static void connectionBD() throws ClassNotFoundException, SQLException {
        // On se connecte a la BD
        Class.forName("oracle.jdbc.driver.OracleDriver");
        connection = DriverManager.getConnection("jdbc:oracle:thin:@log660ora12c.logti.etsmtl.ca:1521:LOG660", "EQUIPE202", "wyuHHyx4");
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        
        try {
            System.out.println("try");

            connectionBD();
            
            if (connection.isValid(15)) {
                System.out.println("Connecté");
            }
        
           //Client.insertClient(connection);
           //Film.insertFilm(connection);
           //Temps.insertTemps(connection);
           Location.insertLocation(connection);
           

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
