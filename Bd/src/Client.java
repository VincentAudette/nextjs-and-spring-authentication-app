import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Client {

    public static void insertionClient(int id, String nomFamille, String prenom,
            String courriel, String tel, String anniv,
            String adresse, String ville, String province,
            String codePostal, String carte, String noCarte,
            int expMois, int expAnnee, String motDePasse,
            String forfait, PreparedStatement statementUtilisateur, PreparedStatement statementAdresse,
            PreparedStatement statementClient, PreparedStatement statementCDC) throws SQLException {

        tableUtilisateur(id, nomFamille, prenom, courriel, tel, anniv, motDePasse, statementUtilisateur);
        tableAdresse(id, adresse, ville, province, codePostal, statementAdresse);
        tableClient(id, forfait, statementClient);
        tableCarteDeCredit(id, carte, noCarte, expMois, expAnnee, statementCDC);
    }

    private static void tableUtilisateur(int id, String nomFamille, String prenom, String courriel, String tel,
            String anniv, String motDePasse, PreparedStatement statementUtilisateur) throws SQLException {
        /* Insertions dans la table Utilisateur */
        int p1 = id;
        String p2 = prenom + " " + nomFamille;
        String p3 = courriel;
        String p4 = tel;
        Date p5 = Date.valueOf(anniv);
        String p6 = motDePasse;

        statementUtilisateur.setInt(1, p1);
        statementUtilisateur.setString(2, p2);
        statementUtilisateur.setString(3, p3);
        statementUtilisateur.setString(4, p4);
        statementUtilisateur.setDate(5, p5);
        statementUtilisateur.setString(6, p6);

        statementUtilisateur.addBatch();
        statementUtilisateur.clearParameters();
    }

    private static void tableAdresse(int id, String adresse, String ville, String province, String codePostal,
            PreparedStatement statementAdresse) throws SQLException {
        /* Insertions dans la table Adresse */
        int p1 = id;
        int p2 = Integer.parseInt(adresse.substring(0, adresse.indexOf(" ")));
        String p3 = adresse.substring(adresse.indexOf(" ")).trim();
        String p4 = ville;
        String p5 = province;
        String p6 = codePostal.replaceAll("\\s+", "");

        statementAdresse.setInt(1, p1);
        statementAdresse.setInt(2, p2);
        statementAdresse.setString(3, p3);
        statementAdresse.setString(4, p4);
        statementAdresse.setString(5, p5);
        statementAdresse.setString(6, p6);

        statementAdresse.addBatch();
        statementAdresse.clearParameters();
    }

    private static void tableClient(int id, String forfait, PreparedStatement statementClient) throws SQLException {
        /* Insertions dans la table Client */
        int p1 = id;
        String p2 = forfait;

        statementClient.setInt(1, p1);
        statementClient.setString(2, p2);

        statementClient.addBatch();
        statementClient.clearParameters();
    }

    private static void tableCarteDeCredit(int id, String carte, String noCarte, int expMois, int expAnnee,
            PreparedStatement statementCDC) throws SQLException {
        /* Insertions dans la table CarteDeCredit */
        int p1 = id;
        String p2 = noCarte.replaceAll("\\s+", "");
        String p3 = carte;
        int p4 = expMois;
        int p5 = expAnnee;
        int p6 = 123; // HARDCODED CVV - TO CHANGE???

        statementCDC.setInt(1, p1);
        statementCDC.setString(2, p2);
        statementCDC.setString(3, p3);
        statementCDC.setInt(4, p4);
        statementCDC.setInt(5, p5);
        statementCDC.setInt(6, p6);

        statementCDC.addBatch();
        statementCDC.clearParameters();
    }
}
