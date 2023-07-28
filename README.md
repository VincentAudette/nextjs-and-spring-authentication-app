# GTI619 - Laboratoire 4 <br>
#### GTI619-01 Sécurité des systèmes (É2023)
**Remis à**: Antoine Tönz et Mathias St-Jean<br>
**Équipe**: F <br><br>
Vincent Audette - AUDV03119608<br>
Philippe Beaufort - BEAP18129801<br>
Nicolas Fournier - FOUN11059705<br>
Lucas Rousselange - ROUL72260001<br><br>
Remise : 9 août 2023

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

