CREATE OR REPLACE TRIGGER RESTE_UNE_COPIE
BEFORE INSERT OR UPDATE
ON Location
FOR EACH row

DECLARE
    t_nb_copie_inventaire Number;
    t_nb_copie_louer Number;
BEGIN
    SELECT quantite 
    INTO t_nb_copie_inventaire
    FROM inventaire 
    WHERE id_film = :new.id_film;

    SELECT count(*)
    INTO t_nb_copie_louer
    FROM Location
    WHERE id_film = :new.id_film and DATE_DE_RETOUR is null;

    IF (t_nb_copie_inventaire - t_nb_copie_louer) = 0 THEN
        RAISE_APPLICATION_ERROR(-20017, 'Aucun film en inventaire.');
    END IF;
END;