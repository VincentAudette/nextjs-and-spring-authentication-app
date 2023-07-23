# Getting Started

1. Go To File > Project structure (IntelliJ) and set Java version to `11`<br>
2. `maven install`<br>
3. Run > AuthApplication.java
4. Open on localhost:8080
5. You can go to localhost:8080/h2-console to access local bd
6. the .sh can be used with Git Bash to create users and look up the bd info 

#### Important
- to create new db and update attributes -> spring.jpa.hibernate.ddl-auto=update
- to use the db and change it with the app -> spring.jpa.hibernate.ddl-auto=none
