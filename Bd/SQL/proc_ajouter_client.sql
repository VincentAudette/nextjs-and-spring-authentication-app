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

