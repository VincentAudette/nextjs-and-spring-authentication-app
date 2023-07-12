package webflix.webflix.Repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import dto.AnalyticsDTO;
import pojo.OlapLocation;
import pojo.CorrelationFilm;
import pojo.CoteMoyenneFilm;

public class AnalyticsRepository {

    public static long getAnalyticsV2(AnalyticsDTO analyticsDTO) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        long $count = 0;

        try {
            String hql = "select count(*) FROM OlapLocation OL WHERE 1=1";

            if (analyticsDTO.getGroupeAge() != -1) {
                hql += " AND OL.groupeAgeClient = :groupeAge";
            }

            if (!analyticsDTO.getProvince().equals("") && analyticsDTO.getProvince() != null) {
                hql += " AND OL.provinceClient like upper(:province)";
            }

            if (analyticsDTO.getJourSemaine() != -1) {
                hql += " AND OL.jourDeSemaine = :jourSemaine";
            }

            if (analyticsDTO.getMoisAnnee() != -1) {
                hql += " AND OL.mois = :mois";
            }

            Query query = session.createQuery(hql);

            if (analyticsDTO.getGroupeAge() != -1) {
                query.setParameter("groupeAge", analyticsDTO.getGroupeAge());
            }

            if(!analyticsDTO.getProvince().equals("") && analyticsDTO.getProvince() != null) {
                query.setParameter("province", analyticsDTO.getProvince());
            }

            if (analyticsDTO.getJourSemaine() != -1) {
                query.setParameter("jourSemaine", analyticsDTO.getJourSemaine());
            }

            if (analyticsDTO.getMoisAnnee() != -1) {
                query.setParameter("mois", analyticsDTO.getMoisAnnee());
            }

            $count = (long)query.getSingleResult();

            session.getTransaction().commit();
            session.close();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            System.out.println(e);
            session.close();
        } finally {
            session.close();
        }

        return $count;
    }

    public static ArrayList<OlapLocation> getAnalytics(AnalyticsDTO analyticsDTO) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

        ArrayList<OlapLocation> locations = new ArrayList<OlapLocation>();

        try {
            String hql = "select OL FROM OlapLocation OL WHERE 1=1"; 

            if (analyticsDTO.getGroupeAge() != -1) {
                hql += " AND OL.groupeAgeClient = :groupeAge";
            }

            if (!analyticsDTO.getProvince().equals("") && analyticsDTO.getProvince() != null) {
                hql += " AND OL.provinceClient like upper(:province)";
            }

            if (analyticsDTO.getJourSemaine() != -1) {
                hql += " AND OL.jourDeSemaine = :jourSemaine";
            }

            if (analyticsDTO.getMoisAnnee() != -1) {
                hql += " AND OL.mois = :mois";
            }

            Query query = session.createQuery(hql);

            if (analyticsDTO.getGroupeAge() != -1) {
                query.setParameter("groupeAge", analyticsDTO.getGroupeAge());
            }

            if(!analyticsDTO.getProvince().equals("") && analyticsDTO.getProvince() != null) {
                query.setParameter("province", analyticsDTO.getProvince());
            }

            if (analyticsDTO.getJourSemaine() != -1) {
                query.setParameter("jourSemaine", analyticsDTO.getJourSemaine());
            }

            if (analyticsDTO.getMoisAnnee() != -1) {
                query.setParameter("mois", analyticsDTO.getMoisAnnee());
            }

            query.setFirstResult(analyticsDTO.getFirstResult());
            query.setMaxResults(analyticsDTO.getMaxResult());
            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                OlapLocation olapLocation = (OlapLocation) iterUtil.next();
                locations.add(olapLocation);
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

    public static double getMoyenneCoteFilm(int idFilm) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        
        CoteMoyenneFilm film = null;

        String hql = "select CMF FROM CoteMoyenneFilm CMF WHERE CMF.idFilm = :idFilm";
        try {
            Query query = session.createQuery(hql);
            query.setParameter("idFilm", idFilm);
            List<?> list = query.getResultList();

            if (query.getResultList().size() > 0 && query.getResultList().size() < 2) {
                film = (CoteMoyenneFilm)list.get(0);
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

        return film.getCoteAvg();
    }

    public static ArrayList<CorrelationFilm> getCorrelationFilm(int idFilm, int res, int max) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        
        ArrayList<CorrelationFilm> films = new ArrayList<CorrelationFilm>();

        try {
            Query query = session.createQuery("select CF FROM CorrelationFilm CF where CF.idFilmJ = :idFilm order by correlation desc");
            query.setFirstResult(res);
            query.setMaxResults(max);
            query.setParameter("idFilm", idFilm);
            System.out.println();

            Iterator<?> iterUtil = query.getResultList().iterator();

            while(iterUtil.hasNext()) {
                CorrelationFilm film = (CorrelationFilm)iterUtil.next();
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

}
