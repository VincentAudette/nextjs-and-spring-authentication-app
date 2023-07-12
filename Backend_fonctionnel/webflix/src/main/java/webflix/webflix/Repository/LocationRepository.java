package webflix.webflix.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Iterator;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.ReturningWork;

import dto.LocationDTO;
import pojo.Location;

public class LocationRepository {

    public static ArrayList<Location> getLocationOfUser(int idUtilisateur) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Location> locations = new ArrayList<Location>();

        try {
            String hql = "FROM Location L WHERE L.utilisateur.idUtilisateur = :idUtilisateur";
            Query query = session.createQuery(hql);
            query.setParameter("idUtilisateur", idUtilisateur);

            Iterator<?> iterUtil = query.getResultList().iterator();

            while (iterUtil.hasNext()) {
                Location location = (Location) iterUtil.next();
                locations.add(location);
            }

            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            System.out.println(e);
            session.close();
        } finally {
            session.close();
        }

        return locations;
    }
    

    public static int createLocation(LocationDTO locationDTO) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        int idLocation = 0;

        try {
            idLocation = session.doReturningWork(new ReturningWork<Integer>() {
                public Integer execute(Connection connection) {
                    CallableStatement call = null;
                    int id = 0;
                    try {
                        call = connection.prepareCall("{ ? = call EFFECTUER_LOCATION(?,?) }");
                        call.registerOutParameter(1, Types.INTEGER);
                        call.setInt(2, locationDTO.getIdUtilisateur());
                        call.setInt(3, locationDTO.getIdFilm());
                        call.execute();
                        id = call.getInt(1);
                    } catch (SQLException e) {
                        String databaseError = e.getMessage().substring(4,9);
                        id = switch (databaseError) {
                            case "20015" -> -1;
                            case "20017" -> -2;
                            default -> id;
                        };
                    }
                    return id;
                }
            });
            session.getTransaction().commit();
            session.close();

        } catch (HibernateException e) {
            session.getTransaction().rollback();
            System.out.println(e.getMessage());
            session.close();
        } finally {
            session.close();
        }

        return idLocation;
    }
}
