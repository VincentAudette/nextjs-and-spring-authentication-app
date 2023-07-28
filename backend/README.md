# Getting Started

1. Go To File > Project structure (IntelliJ) and set Java version to `11`<br>
2. `maven install`<br>
3. Run > AuthApplication.java
4. Open on localhost:8080
5. You can go to localhost:8080/h2-console to access local bd
6. the .sh can be used with Git Bash to create users and look up the bd info 

#### Ways to use h2
- to create new db and update attributes -> spring.jpa.hibernate.ddl-auto=update
- to use the db and change it with the app -> spring.jpa.hibernate.ddl-auto=none

1. bd in memory (often used for test) -> spring.datasource.url=jdbc:h2:mem:testdb
2. local bd -> spring.datasource.url=jdbc:h2:./userinfo
3. local bd with tcp connexion, server mode (port 8082) with local file -> jdbc:h2:tcp://localhost/~/src/java/MyDatabase;IFEXISTS=TRUE