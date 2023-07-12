CREATE OR REPLACE VIEW Nombre_De_film_Emprunter_Par_Utilisateur as
SELECT nom, COUNT(id_utilisateur) AS "Nombre de film emprunter"
FROM CLIENT
NATURAL JOIN LOCATION
NATURAL JOIN UTILISATEUR
WHERE date_de_retour is null
GROUP BY id_utilisateur, nom;
