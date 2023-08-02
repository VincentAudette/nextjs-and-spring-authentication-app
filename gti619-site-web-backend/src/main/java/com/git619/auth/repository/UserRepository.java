package com.git619.auth.repository;

import com.git619.auth.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends CrudRepository<User, Long>  {
    User findUserById(Long id);
    User findByUsername(String username);
    void deleteById(Long id);

}
