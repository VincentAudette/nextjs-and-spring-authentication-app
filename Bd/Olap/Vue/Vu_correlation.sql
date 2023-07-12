CREATE MATERIALIZED VIEW correlation_film
REFRESH FORCE START WITH SYSDATE
NEXT TRUNC(SYSDATE) + 60/48
AS 
SELECT idFilm_j, idFilm_k, corr_haut/corr_bas correlation
FROM(
    SELECT idFilm_j, 
            idFilm_k, 
            SUM((cote_j - moy_j) * (cote_k - moy_k)) corr_haut,
            SQRT(SUM(POWER((cote_j - moy_j),2)) * SUM(POWER((cote_k - moy_k),2))) corr_bas,
            COUNT(idClient) card
    FROM(
        SELECT cj.idClient idClient, cj.cote cote_j, cj.idFilm idFilm_j, cj.moy moy_j,  ck.cote cote_k, ck.idFilm idFilm_k, ck.moy moy_k
        FROM 
        (SELECT idClient, idFilm, cote, AVG(cote) OVER(PARTITION BY idfilm) moy
        FROM cote_loc ) cj
        INNER JOIN (SELECT idClient, idFilm, cote, AVG(cote) OVER(PARTITION BY idfilm) moy
        FROM cote_loc ) ck 
            ON cj.idClient = ck.idClient 
                AND cj.idFilm < ck.idFilm
        WHERE cj.cote > 0 AND ck.cote > 0
        )
    
    GROUP BY idFilm_j, idFilm_k)
WHERE card > 50
AND corr_bas > 0
AND corr_haut >= 0
;
    
    
    
    
    
    
    
