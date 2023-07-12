CREATE OR REPLACE TRIGGER is_client_adult
    BEFORE INSERT OR UPDATE
    ON Utilisateur
    FOR EACH ROW
BEGIN
    IF (SYSDATE < add_months(:NEW.DATE_DE_NAISSANCE, 12*18)) THEN
        RAISE_APPLICATION_ERROR(-20016, 'Le client n''est pas un adulte');
    END IF;
END;
