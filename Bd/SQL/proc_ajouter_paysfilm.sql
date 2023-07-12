CREATE OR REPLACE PROCEDURE AJOUTER_PAYSFILM(
    id_film_param INTEGER,
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
    insert into PAYSFILM values (ID_PAYS, id_film_param);
    ELSE
    --     else insert the pays_id and the film_id to the paysfilm table
    insert into PAYSFILM values (ID_PAYS, id_film_param);
end if;

end;

/
