package webflix.webflix.Repository;

import java.util.ArrayList;
import java.util.Iterator;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;

import pojo.Personne;

public class PersonneRepository {
    
    public static ArrayList<Personne> getPersonnes(int firstResult, int maxResult) {
        if(maxResult == 0)
            maxResult = 10;
        
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Personne> personnes = new ArrayList<Personne>();

        try {
            Query query = session.createQuery("FROM Personne");
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator(); 

            while(iterUtil.hasNext()) {
                Personne personne = (Personne) iterUtil.next(); 
                personnes.add(personne);
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

        return personnes;
    }
}
