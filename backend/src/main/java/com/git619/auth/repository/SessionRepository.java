package com.git619.auth.repository;

import com.git619.auth.domain.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {
    Session findSessionById(Long aLong);
    Session findSessionByToken(String token);
    void deleteById(Long aLong);
}
