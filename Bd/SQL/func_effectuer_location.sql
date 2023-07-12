create or replace FUNCTION EFFECTUER_LOCATION(
    in_idUser NUMBER,
    in_idFilm NUMBER
)
RETURN NUMBER
    AS
    id_location_out NUMBER;
    duree_max_location NUMBER;
BEGIN

SELECT f.DUREE_MAX INTO duree_max_location
FROM forfait f natural join client c
WHERE c.id_utilisateur = in_idUser;

INSERT INTO LOCATION VALUES (null, in_idFilm, in_idUser, null, SYSDATE + duree_max_location, SYSDATE)
RETURNING ID_LOCATION into id_location_out;

RETURN id_location_out;

END EFFECTUER_LOCATION;
/


