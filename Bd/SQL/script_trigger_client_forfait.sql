CREATE OR REPLACE TRIGGER CLIENT_FORFAIT_LOCATION
BEFORE INSERT OR UPDATE
ON Location
FOR EACH row

DECLARE
    t_nb_copie_louer Number;
    t_nb_copie_allowed Number;

BEGIN
    SELECT f.location_max 
    INTO t_nb_copie_allowed 
    FROM forfait f NATURAL JOIN client c 
    WHERE c.id_utilisateur = :new.id_utilisateur;

    SELECT count(*)
    INTO t_nb_copie_louer
    FROM Location
    WHERE id_utilisateur = :new.id_utilisateur and DATE_DE_RETOUR is null;

    IF t_nb_copie_allowed <= t_nb_copie_louer THEN
        RAISE_APPLICATION_ERROR(-20015, 'Client à atteint le maximum de locations permises.');
    END IF;
END;
