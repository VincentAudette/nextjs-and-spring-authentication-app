package com.git619.auth.domain;

import javax.persistence.*;

@Entity
@Table(name="PASSWORD_CONFIG")
public class PasswordConfig {

    @Id
    @Column(name = "ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PWD_CARACTERS", columnDefinition = "NUMBER(38,0)")
    private int pwdCharacters;

    @Column(name = "SPECIAL_CARACTER", columnDefinition = "NUMBER(1,0)")
    private Boolean specialCaracter;

    @Column(name = "UPPERCASE", columnDefinition = "NUMBER(1,0)")
    private Boolean uppercase;

    @Column(name = "NUMBER", columnDefinition = "NUMBER(1,0)")
    private Boolean number;

    public Long getId() {
        return id;
    }

    public int getPwdCharacters() {
        return pwdCharacters;
    }

    public void setPwdCharacters(int pwdCharacters) {
        this.pwdCharacters = pwdCharacters;
    }

    public Boolean getSpecialCaracter() {
        return specialCaracter;
    }

    public void setSpecialCaracter(Boolean specialCaracter) {
        this.specialCaracter = specialCaracter;
    }

    public Boolean getUppercase() {
        return uppercase;
    }

    public void setUppercase(Boolean uppercase) {
        this.uppercase = uppercase;
    }

    public Boolean getNumber() {
        return number;
    }

    public void setNumber(Boolean number) {
        this.number = number;
    }
}

