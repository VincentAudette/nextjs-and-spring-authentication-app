# Système d'authentification pour un cours de sécurité <br>
Technologies Next.js (TS) - Spring (Java)

## Introduction

Ce projet est une site web qui implémente certaines fonctionnalités de sécurité.

## Instruction LOCAL
### Backend
1. Utiliser au minimum `jdk-11`
2. `maven install` dans le dossier `/backend`à
3. Si vous ouvrez le dossier `/backend` comme `root` de projet, changé
   1. `backend/src/main/resources/application.properties` > `spring.datasource.url=` à `jdbc:h2:./userinfo`

4. Lancer `AuthApplication.java`
5. Le backend ouvre sur [http://localhost:8080](http://localhost:8080)
6. LA bd locale h2 peut être accédée sur [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
### Frontend
1. Installer `Node`
2. `npm install` dans le dossier `/frontend`
3. Lancer avec la commande `npm run dev`
4. Le frontend ouvre sur [http://localhost:3000](http://localhost:3000)
5. Créé un fichier `.env` dans le frontend et mettre ceci : `SECRETE_AUTH_KEY="Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY="`

