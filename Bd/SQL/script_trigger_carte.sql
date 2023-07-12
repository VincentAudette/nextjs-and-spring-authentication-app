CREATE OR REPLACE TRIGGER  carte_credit_non_expiree
BEFORE INSERT OR UPDATE 
ON CarteDeCredit
FOR EACH ROW
DECLARE
    this_year INTEGER;
    this_month INTEGER;
BEGIN
    SELECT EXTRACT(YEAR FROM SYSDATE) INTO this_year FROM DUAL;
    SELECT EXTRACT(MONTH FROM SYSDATE) INTO this_month FROM DUAL;
    
    IF(this_year > :new.exp_annee OR (this_year = :new.exp_annee AND this_month > :new.exp_mois)) THEN 
        RAISE_APPLICATION_ERROR(-20003, 'La carte de crédit est expirée');
    END IF;
END;