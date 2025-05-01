package com.dinofestas.api.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "admin_users")
public class AdminUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    // Getter e Setter para id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter e Setter para username
    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter e Setter para passwordHash
    @Override
    public String getPassword() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For now, we'll return an empty list of authorities.
        // You'll need to implement your role/permission logic here later.
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // You can add logic here if accounts can expire
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // You can add logic here to handle locked accounts
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // You can add logic here if passwords can expire
    }

    @Override
    public boolean isEnabled() {
        return true; // You can add logic here to handle disabled users
    }
}