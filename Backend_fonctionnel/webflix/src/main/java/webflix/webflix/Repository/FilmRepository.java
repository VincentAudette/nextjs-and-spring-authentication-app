package webflix.webflix.Repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import dto.RechercheFilm;
import pojo.Bandeannonce;
import pojo.Film;

public class FilmRepository {

    public static ArrayList<Film> getFilms(int firstResult, int maxResult) {

        if(maxResult == 0)
            maxResult = 10;

        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

        Session session = sessionFactory.openSession();
        
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();
        
        try {
            Query query = session.createQuery("FROM Film");
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static Film getFilm(int idFilm) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Film film = null;
        
        try {
            Query query = session.createQuery(
                "FROM Film " +
                "WHERE id_film = " + idFilm);
            List<?> list = query.getResultList();

            if(query.getResultList().size() > 1){
                //ERROR? 
            }
            film = (Film)list.get(0);

            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            System.out.println(e);
            session.close();
        } finally {
            session.close();
        }

        return film;
    }

    public static ArrayList<Film> getFilmsByTitre(String filmName) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();
        
        try {
            Query query = session.createQuery(
                "FROM Film f " +
                "WHERE upper(f.titre) LIKE " +  "upper('%"+filmName+"%')");
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsByGenre(String genreFilm, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "SELECT F FROM Film F JOIN F.genres G WHERE G.genre.genre = :genreFilm"; 
            Query query = session.createQuery(hql);
            query.setParameter("genreFilm", genreFilm);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsByRealisateur(String realisateur, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "SELECT F FROM Film F WHERE F.realisateur.nomPersonne = :realisateur"; 
            Query query = session.createQuery(hql);
            query.setParameter("realisateur", realisateur);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsByActeur(String acteur, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {
            String hql = "SELECT F FROM Film F JOIN F.acteurs A WHERE A.nomPersonne = :acteur"; 
            Query query = session.createQuery(hql);
            query.setParameter("acteur", acteur);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }


    public static ArrayList<Film> getFilmsByLangue(String langue, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "SELECT F FROM Film F WHERE F.langue = :langue"; 
            Query query = session.createQuery(hql);
            query.setParameter("langue", langue);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsByPays(String pays, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "SELECT F FROM Film F JOIN F.pays G WHERE G.nom = :pays"; 
            Query query = session.createQuery(hql);
            query.setParameter("pays", pays);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsByAnnee(int anneeBegin, int anneeEnd, int firstResult, int maxResult) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "SELECT F FROM Film F WHERE F.annee BETWEEN :anneeBegin AND :anneeEnd"; 
            Query query = session.createQuery(hql);
            query.setParameter("anneeBegin", anneeBegin);
            query.setParameter("anneeEnd", anneeEnd);
            query.setFirstResult(firstResult);
            query.setMaxResults(maxResult);
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }

    public static ArrayList<Film> getFilmsRecherche(RechercheFilm rechercheFilm) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<Film> films = new ArrayList<Film>();

        try {

            String hql = "select distinct F FROM Film F " +
                         "JOIN F.acteurs A " + 
                         "JOIN F.genres G " + 
                         "JOIN F.pays P WHERE 1=1"; 
            
            if(!rechercheFilm.getActeur().equals("") && rechercheFilm.getActeur() != null) {
                hql += " AND lower(A.nomPersonne) like lower(:acteur)";
            }

            if(!rechercheFilm.getTitre().equals("") && rechercheFilm.getTitre() != null) {
                hql += " AND lower(F.titre) like lower(:titre)";
            }

            if(!rechercheFilm.getGenre().equals("") && rechercheFilm.getGenre() != null) {
                hql += " AND lower(G.genre) like lower(:genre)";
            }
            
            if(!rechercheFilm.getRealisateur().equals("") && rechercheFilm.getRealisateur() != null) {
                hql += " AND lower(F.realisateur.nomPersonne) like lower(:realisateur)";
            }

            if(rechercheFilm.getAnneeBegin() != -1 && rechercheFilm.getAnneeEnd() != -1)  {
                hql += " AND F.annee BETWEEN :anneeBegin AND :anneeEnd";
            }
            
            if(!rechercheFilm.getPays().equals("") && rechercheFilm.getPays() != null) {
                hql += " AND lower(P.nom) like lower(:pays)";
            }

            if(!rechercheFilm.getLangue().equals("") && rechercheFilm.getLangue() != null) {
                hql += " AND lower(F.langue) like lower(:langue)";
            }
            Query query = session.createQuery(hql);
            
            if (!rechercheFilm.getActeur().equals("") && rechercheFilm.getActeur() != null) {
                query.setParameter("acteur", "%"+rechercheFilm.getActeur()+"%");
            }

            if (!rechercheFilm.getTitre().equals("") && rechercheFilm.getTitre() != null) {
                query.setParameter("titre", "%"+rechercheFilm.getTitre()+"%");
            }

            if (!rechercheFilm.getGenre().equals("") && rechercheFilm.getGenre() != null) {
                query.setParameter("genre", "%"+rechercheFilm.getGenre()+"%");
            }

            if (!rechercheFilm.getRealisateur().equals("") && rechercheFilm.getRealisateur() != null) {
                query.setParameter("realisateur", "%"+rechercheFilm.getRealisateur()+"%");
            }

            if (rechercheFilm.getAnneeBegin() != -1) {
                query.setParameter("anneeBegin", rechercheFilm.getAnneeBegin());
            } 
                
            if (rechercheFilm.getAnneeEnd() != -1) {
                query.setParameter("anneeEnd", rechercheFilm.getAnneeEnd());
            } 

            if (!rechercheFilm.getPays().equals("") && rechercheFilm.getPays() != null) {
                query.setParameter("pays", "%"+rechercheFilm.getPays()+"%");
            }

            if (!rechercheFilm.getLangue().equals("") && rechercheFilm.getLangue() != null) {
                query.setParameter("langue", "%"+rechercheFilm.getLangue()+"%");
            }


            query.setFirstResult(rechercheFilm.getFirstResult());
            query.setMaxResults(rechercheFilm.getMaxResult());
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                Film film = (Film) iterUtil.next();
                films.add(film);
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

        return films;
    }
    
    public static Bandeannonce getFirstBandeAnnonceFilm(int idFilm) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        Bandeannonce bandeAnnonce = null;
        
        try {
            Query query = session.createQuery(
                "FROM Bandeannonce " +
                "WHERE id_film = " + idFilm);
            List<?> list = query.getResultList();

            if(query.getResultList().size() > 1){
                //ERROR? 
            }
            bandeAnnonce = (Bandeannonce)list.get(0);

            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            System.out.println(e);
            session.close();
        } finally {
            session.close();
        }

        return bandeAnnonce;
    }
}
