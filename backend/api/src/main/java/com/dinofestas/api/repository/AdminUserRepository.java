package com.dinofestas.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinofestas.api.model.AdminUser;

import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByUsername(String username);
}
