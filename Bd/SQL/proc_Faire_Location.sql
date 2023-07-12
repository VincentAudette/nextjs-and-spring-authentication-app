create or replace PROCEDURE FAIRE_LOCATION(
    in_idUser NUMBER,
    in_idFilm NUMBER
)
    IS
    duree_max_location NUMBER;
BEGIN

SELECT f.DUREE_MAX INTO duree_max_location
FROM forfait f natural join client c
WHERE c.id_utilisateur = in_idUser;

INSERT INTO LOCATION VALUES (null, in_idFilm, in_idUser, null, SYSDATE + duree_max_location, SYSDATE);

END FAIRE_LOCATION;
/