package com.dinofestas.api.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dinofestas.api.model.AdminUser;
import com.dinofestas.api.repository.AdminUserRepository;

import java.util.Optional;

@Service
public class AuthService {

    private final AdminUserRepository adminUserRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(AdminUserRepository adminUserRepository, JwtService jwtService) {
        this.adminUserRepository = adminUserRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String authenticate(String username, String password) {
        System.out.println("Autenticando usuário: " + username);
        System.out.println("Senha: " + password);
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        AdminUser user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Senha incorreta");
        }

        return jwtService.generateToken(user);
    }
}
