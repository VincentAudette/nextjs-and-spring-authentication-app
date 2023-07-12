import java.io.FileInputStream;
import java.io.IOException;

import java.io.InputStream;

import java.sql.*;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

public class LectureBD {

    private static Connection connection = null;

    public LectureBD() throws SQLException, ClassNotFoundException {
        connectionBD();
    }

    public void lecturePersonnes(String nomFichier) {
        try {
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser parser = factory.newPullParser();

            InputStream is = new FileInputStream(nomFichier);
            parser.setInput(is, null);

            int eventType = parser.getEventType();

            String tag = null,
                    nom = null,
                    anniversaire = null,
                    lieu = null,
                    photo = null,
                    bio = null;

            int id = -1;

            PreparedStatement statementPersonne = connection.prepareStatement("INSERT INTO Personne VALUES(?, ?, ?, ?, ?, ?, ?)");

            while (eventType != XmlPullParser.END_DOCUMENT) {
                if (eventType == XmlPullParser.START_TAG) {
                    tag = parser.getName();

                    if (tag.equals("personne") && parser.getAttributeCount() == 1)
                        id = Integer.parseInt(parser.getAttributeValue(0));
                } else if (eventType == XmlPullParser.END_TAG) {
                    tag = null;

                    if (parser.getName().equals("personne") && id >= 0) {
                        Personne.insertionPersonne(id, nom, anniversaire, lieu, photo, bio, statementPersonne);

                        id = -1;
                        nom = null;
                        anniversaire = null;
                        lieu = null;
                        photo = null;
                        bio = null;
                    }
                } else if (eventType == XmlPullParser.TEXT && id >= 0) {
                    if (tag != null) {
                        if (tag.equals("nom"))
                            nom = parser.getText();
                        else if (tag.equals("anniversaire"))
                            anniversaire = parser.getText();
                        else if (tag.equals("lieu"))
                            lieu = parser.getText();
                        else if (tag.equals("photo"))
                            photo = parser.getText();
                        else if (tag.equals("bio"))
                            bio = parser.getText();
                    }
                }

                eventType = parser.next();
            }

            statementPersonne.executeBatch();
        } catch (XmlPullParserException e) {
            System.out.println(e);
        } catch (IOException e) {
            System.out.println("IOException while parsing " + nomFichier);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void lectureFilms(String nomFichier) {
        try {
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser parser = factory.newPullParser();

            InputStream is = new FileInputStream(nomFichier);
            parser.setInput(is, null);

            int eventType = parser.getEventType();

            String tag = null,
                    titre = null,
                    langue = null,
                    poster = null,
                    roleNom = null,
                    rolePersonnage = null,
                    realisateurNom = null,
                    resume = null;

            ArrayList<String> pays = new ArrayList<String>();
            ArrayList<String> genres = new ArrayList<String>();
            ArrayList<String> scenaristes = new ArrayList<String>();
            ArrayList<Role> roles = new ArrayList<Role>();
            ArrayList<String> annonces = new ArrayList<String>();

            int id = -1,
                    annee = -1,
                    duree = -1,
                    roleId = -1,
                    realisateurId = -1;

            PreparedStatement stmtFilm = connection.prepareStatement("INSERT INTO FilM VALUES(?,?,?,?,?,?,?,?)");
            PreparedStatement stmtRole = connection.prepareStatement("INSERT INTO ROLEACTEUR VALUES (?,?,?)");
            PreparedStatement stmtInventaire = connection.prepareStatement("INSERT INTO INVENTAIRE VALUES (?,?)");
            PreparedStatement stmtBandeAnnonce = connection.prepareStatement("INSERT INTO BANDEANNONCE VALUES (?,?,?)");

            while (eventType != XmlPullParser.END_DOCUMENT) {
                if (eventType == XmlPullParser.START_TAG) {
                    tag = parser.getName();

                    if (tag.equals("film") && parser.getAttributeCount() == 1)
                        id = Integer.parseInt(parser.getAttributeValue(0));
                    else if (tag.equals("realisateur") && parser.getAttributeCount() == 1)
                        realisateurId = Integer.parseInt(parser.getAttributeValue(0));
                    else if (tag.equals("acteur") && parser.getAttributeCount() == 1)
                        roleId = Integer.parseInt(parser.getAttributeValue(0));
                } else if (eventType == XmlPullParser.END_TAG) {
                    tag = null;

                    if (parser.getName().equals("film") && id >= 0) {
                        Film.insertionFilm(id, titre, annee, pays, langue,
                                duree, resume, genres, realisateurNom,
                                realisateurId, scenaristes,
                                roles, poster, annonces, connection, 
                                stmtFilm, stmtRole, stmtInventaire, stmtBandeAnnonce);

                        id = -1;
                        annee = -1;
                        duree = -1;
                        titre = null;
                        langue = null;
                        poster = null;
                        resume = null;
                        realisateurNom = null;
                        roleNom = null;
                        rolePersonnage = null;
                        realisateurId = -1;
                        roleId = -1;

                        genres.clear();
                        scenaristes.clear();
                        roles.clear();
                        annonces.clear();
                        pays.clear();
                    }
                    if (parser.getName().equals("role") && roleId >= 0) {
                        roles.add(new Role(roleId, roleNom, rolePersonnage));
                        roleId = -1;
                        roleNom = null;
                        rolePersonnage = null;
                    }
                } else if (eventType == XmlPullParser.TEXT && id >= 0) {
                    if (tag != null) {
                        if (tag.equals("titre"))
                            titre = parser.getText();
                        else if (tag.equals("annee"))
                            annee = Integer.parseInt(parser.getText());
                        else if (tag.equals("pays"))
                            pays.add(parser.getText());
                        else if (tag.equals("langue"))
                            langue = parser.getText();
                        else if (tag.equals("duree"))
                            duree = Integer.parseInt(parser.getText());
                        else if (tag.equals("resume"))
                            resume = parser.getText();
                        else if (tag.equals("genre"))
                            genres.add(parser.getText());
                        else if (tag.equals("realisateur"))
                            realisateurNom = parser.getText();
                        else if (tag.equals("scenariste"))
                            scenaristes.add(parser.getText());
                        else if (tag.equals("acteur"))
                            roleNom = parser.getText();
                        else if (tag.equals("personnage"))
                            rolePersonnage = parser.getText();
                        else if (tag.equals("poster"))
                            poster = parser.getText();
                        else if (tag.equals("annonce"))
                            annonces.add(parser.getText());
                    }
                }

                eventType = parser.next();
            }

            stmtFilm.close();
            stmtRole.executeBatch();
            stmtInventaire.executeBatch();
            stmtBandeAnnonce.executeBatch();
        } catch (XmlPullParserException e) {
            System.out.println(e);
        } catch (IOException e) {
            System.out.println("IOException while parsing " + nomFichier);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void lectureClients(String nomFichier) throws SQLException {
        try {
            XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
            XmlPullParser parser = factory.newPullParser();

            InputStream is = new FileInputStream(nomFichier);
            parser.setInput(is, null);

            int eventType = parser.getEventType();

            String tag = null,
                    nomFamille = null,
                    prenom = null,
                    courriel = null,
                    tel = null,
                    anniv = null,
                    adresse = null,
                    ville = null,
                    province = null,
                    codePostal = null,
                    carte = null,
                    noCarte = null,
                    motDePasse = null,
                    forfait = null;

            int id = -1,
                    expMois = -1,
                    expAnnee = -1;

            PreparedStatement statementUtilisateur = connection.prepareStatement("INSERT INTO Utilisateur VALUES(?, ?, ?, ?, ?, ?)");
            PreparedStatement statementAdresse = connection.prepareStatement("INSERT INTO Adresse VALUES(?, ?, ?, ?, ?, ?)");
            PreparedStatement statementClient = connection.prepareStatement("INSERT INTO Client VALUES(?, ?)");
            PreparedStatement statementCDC = connection.prepareStatement("INSERT INTO CarteDeCredit VALUES(?, ?, ?, ?, ?, ?)");

            while (eventType != XmlPullParser.END_DOCUMENT) {
                if (eventType == XmlPullParser.START_TAG) {
                    tag = parser.getName();

                    if (tag.equals("client") && parser.getAttributeCount() == 1)
                        id = Integer.parseInt(parser.getAttributeValue(0));
                } else if (eventType == XmlPullParser.END_TAG) {
                    tag = null;

                    if (parser.getName().equals("client") && id >= 0) {
                        Client.insertionClient(id, nomFamille, prenom, courriel, tel,
                                anniv, adresse, ville, province,
                                codePostal, carte, noCarte,
                                expMois, expAnnee, motDePasse, forfait, statementUtilisateur, statementAdresse,
                                statementClient, statementCDC);

                        nomFamille = null;
                        prenom = null;
                        courriel = null;
                        tel = null;
                        anniv = null;
                        adresse = null;
                        ville = null;
                        province = null;
                        codePostal = null;
                        carte = null;
                        noCarte = null;
                        motDePasse = null;
                        forfait = null;

                        id = -1;
                        expMois = -1;
                        expAnnee = -1;
                    }
                } else if (eventType == XmlPullParser.TEXT && id >= 0) {
                    if (tag != null) {
                        if (tag.equals("nom-famille"))
                            nomFamille = parser.getText();
                        else if (tag.equals("prenom"))
                            prenom = parser.getText();
                        else if (tag.equals("courriel"))
                            courriel = parser.getText();
                        else if (tag.equals("tel"))
                            tel = parser.getText();
                        else if (tag.equals("anniversaire"))
                            anniv = parser.getText();
                        else if (tag.equals("adresse"))
                            adresse = parser.getText();
                        else if (tag.equals("ville"))
                            ville = parser.getText();
                        else if (tag.equals("province"))
                            province = parser.getText();
                        else if (tag.equals("code-postal"))
                            codePostal = parser.getText();
                        else if (tag.equals("carte"))
                            carte = parser.getText();
                        else if (tag.equals("no"))
                            noCarte = parser.getText();
                        else if (tag.equals("exp-mois"))
                            expMois = Integer.parseInt(parser.getText());
                        else if (tag.equals("exp-annee"))
                            expAnnee = Integer.parseInt(parser.getText());
                        else if (tag.equals("mot-de-passe"))
                            motDePasse = parser.getText();
                        else if (tag.equals("forfait"))
                            forfait = parser.getText();
                    }
                }

                eventType = parser.next();
            }

            statementUtilisateur.executeBatch();
            statementAdresse.executeBatch();
            statementClient.executeBatch();
            statementCDC.executeBatch();

        } catch (XmlPullParserException e) {
            System.out.println(e);
        } catch (IOException e) {
            System.out.println("IOException while parsing " + nomFichier);
        }
    }

    private void creationForfaits() throws SQLException {

        Statement statement = connection.createStatement();

        statement.execute("INSERT INTO Forfait VALUES('D', 5, 1, 10, 'Débutant')");
        statement.execute("INSERT INTO Forfait VALUES('I', 10, 5, 30, 'Intermédiaire')");
        statement.execute("INSERT INTO Forfait VALUES('A', 15, 10, -1, 'Avancé')");
    }

    private void connectionBD() throws ClassNotFoundException, SQLException {
        // On se connecte a la BD
        Class.forName("oracle.jdbc.driver.OracleDriver");
        connection = DriverManager.getConnection("jdbc:oracle:thin:@log660ora12c.logti.etsmtl.ca:1521:LOG660",
                "EQUIPE202", "wyuHHyx4");
    }

    /**
     * Basé sur diapo dans Notion préléminaire
     * 
     * @param idClient
     * @param idFilm
     * @param connection
     * @throws ClassNotFoundException
     * @throws SQLException
     */// This looks to be a thing to call procedures in Java
    private void faireLocation(int idClient, int idFilm, Connection connection) throws ClassNotFoundException, SQLException {
        CallableStatement call = connection.prepareCall("{call pFAIRE_LOCATION(?,?)}");

        // Spécification des paramètres d'entrée
        call.setInt(1, idClient);
        call.setInt(2, idFilm);

        // Exécution de l'appel
        call.execute();

        call.close();
    }

    public static void main(String[] args) throws SQLException, ClassNotFoundException {

        LectureBD lecture = new LectureBD();

        if (connection.isValid(15)) {
            System.out.println("Connecté");
        }

        lecture.creationForfaits();
        lecture.lecturePersonnes("db_latin1\\personnes_latin1.xml");
        lecture.lectureClients("db_latin1\\clients_latin1.xml");
        lecture.lectureFilms("db_latin1\\films_latin1.xml");
        
        connection.close();
    }
}
