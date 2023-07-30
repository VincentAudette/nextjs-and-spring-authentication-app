package com.git619.auth.domain;

import javax.persistence.*;

@Entity
@Table(name="PASSWORD_CONFIG")
public class PasswordConfig {

    @Id
    @Column(name = "ID", columnDefinition = "NUMBER(38,0)")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PASSWORD_LENGTH", columnDefinition = "NUMBER(38,0)")
    private int passwordLength;

    @Column(name = "NEEDS_SPECIAL_CHARACTER", columnDefinition = "NUMBER(1,0)")
    private Boolean needsSpecialCharacter;

    @Column(name = "NEEDS_UPPERCASE", columnDefinition = "NUMBER(1,0)")
    private Boolean needsUppercase;

    @Column(name = "NEEDS_NUMBER", columnDefinition = "NUMBER(1,0)")
    private Boolean needsNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPasswordLength() {
        return passwordLength;
    }

    public void setPasswordLength(int passwordLength) {
        this.passwordLength = passwordLength;
    }

    public Boolean getNeedsSpecialCharacter() {
        return needsSpecialCharacter;
    }

    public void setNeedsSpecialCharacter(Boolean needsSpecialCharacter) {
        this.needsSpecialCharacter = needsSpecialCharacter;
    }

    public Boolean getNeedsUppercase() {
        return needsUppercase;
    }

    public void setNeedsUppercase(Boolean needsUppercase) {
        this.needsUppercase = needsUppercase;
    }

    public Boolean getNeedsNumber() {
        return needsNumber;
    }

    public void setNeedsNumber(Boolean needsNumber) {
        this.needsNumber = needsNumber;
    }
}


