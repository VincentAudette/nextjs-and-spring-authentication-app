package com.git619.auth.repository;

import com.git619.auth.domain.Session;
import com.git619.auth.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {
    List<Session> findByUser(User user);

    @Query("SELECT s FROM Session s WHERE s.active = true")
    List<Session> findAllActiveSessions();
}
