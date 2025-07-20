package com.sportifyx.repository;

import com.sportifyx.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByEmailAndPasswordAndRole(String email, String password, String role);
  boolean existsByEmail(String email);
}
