create or replace PROCEDURE AJOUTER_CLIENT(
    in_nomFamille VARCHAR,
    in_nom VARCHAR,
    in_courriel VARCHAR,
    in_tel VARCHAR,
    in_anniv DATE,
    in_ville VARCHAR,
    in_noAdresse NUMBER,
    in_rueAdresse VARCHAR,
    in_province VARCHAR,
    in_codePostal VARCHAR,
    in_carte VARCHAR,
    in_noCarte VARCHAR,
    in_exp_mois NUMBER,
    in_exp_annee NUMBER,
    in_mdp VARCHAR,
    in_Code_forfait CHAR,
    in_cvv NUMBER
)
    IS
    idClient NUMBER;
BEGIN

INSERT INTO Utilisateur VALUES(NULL, in_nom || ' ' || in_nomFamille, in_courriel, in_tel, in_anniv, in_mdp);

SELECT id_utilisateur INTO idClient FROM Utilisateur WHERE courriel = in_courriel;

INSERT INTO Adresse VALUES(idClient, in_noAdresse, in_rueAdresse, in_ville, in_province, in_codePostal);
INSERT INTO Client VALUES(idClient, in_Code_forfait);
INSERT INTO CarteDeCredit VALUES(idClient, in_noCarte, in_carte, in_exp_mois, in_exp_annee, in_cvv); --CVV TO CHANGE

END AJOUTER_CLIENT;
/



create or replace PROCEDURE FAIRE_LOCATION(
    in_idUser Number,
    in_idFilm NUMBER
)
    IS
    duree_max_location NUMBER;
BEGIN

SELECT f.DUREE_MAX INTO duree_max_location
FROM forfait f natural join client c
WHERE c.id_utilisateur = in_idUser;

INSERT INTO LOCATION VALUES (in_idFilm, in_idUser, null, null, SYSDATE + duree_max_location, SYSDATE);

END FAIRE_LOCATION;
/


CREATE OR REPLACE PROCEDURE AJOUTER_PAYSFILM(
    ID_FILM INTEGER,
    NOM_PAYS VARCHAR
)
    IS
    ID_PAYS NUMBER;
BEGIN
    SELECT ID_PAYS INTO ID_PAYS FROM PAYS WHERE NOM_PAYS = NOM;

--     if the pays id is null insert the country in PAYS
    IF ID_PAYS is null THEN
        insert into pays values (NULL, NOM_PAYS);
        SELECT ID_PAYS INTO ID_PAYS FROM PAYS WHERE NOM_PAYS = NOM;
        insert into PAYSFILM values (ID_PAYS, ID_FILM);
    ELSE
        --     else insert the pays_id and the film_id to the paysfilm table
        insert into PAYSFILM values (ID_PAYS, ID_FILM);
    end if;

end;
/
