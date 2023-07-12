package webflix.webflix.Repository;

import java.util.ArrayList;
import java.util.Iterator;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;

import pojo.Genre;

public class GenreRepository {

    public static ArrayList<Genre> getGenres() {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Genre> genres = new ArrayList<Genre>();
        
        try {
            Query query = session.createQuery("FROM Genre");
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Genre genreI = (Genre) iterUtil.next();
                genres.add(genreI);
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

        return genres;
    }

    
}
