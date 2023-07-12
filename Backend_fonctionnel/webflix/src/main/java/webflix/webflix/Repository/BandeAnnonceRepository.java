package webflix.webflix.Repository;

import java.util.ArrayList;
import java.util.Iterator;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;

import pojo.Bandeannonce;

public class BandeAnnonceRepository {
    
    public static ArrayList<Bandeannonce> getBandeAnnonces(int firstResult, int maxResult) {
        if(maxResult == 0)
            maxResult = 10;
        
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Bandeannonce> BandeAnnonces = new ArrayList<Bandeannonce>();

        try {
            Query query = session.createQuery("FROM Bandeannonce");
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator(); 

            while(iterUtil.hasNext()) {
                Bandeannonce bandeAnnonce = (Bandeannonce) iterUtil.next(); 
                BandeAnnonces.add(bandeAnnonce);
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

        return BandeAnnonces;
    }
}
