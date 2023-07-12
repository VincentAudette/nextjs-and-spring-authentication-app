package webflix.webflix.Repository;

import dto.Login;
import pojo.Utilisateur;

import java.util.Iterator;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;

public class AuthRepository {
    
    public static Utilisateur getUtilisateur(Login login) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Utilisateur utilisateur = null;

        try {
            String hql = "FROM Utilisateur U WHERE U.courriel = :courriel";
            Query query = session.createQuery(hql);
            query.setParameter("courriel", login.getCourriel());

            Iterator<?> iterUtil = query.getResultList().iterator(); 

            while(iterUtil.hasNext()) {
                utilisateur = (Utilisateur) iterUtil.next(); 
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

        if (utilisateur == null || !login.getMotDePasse().equals(utilisateur.getMotDePasse())) {
            return null;
        }

        return utilisateur;
    }
}
