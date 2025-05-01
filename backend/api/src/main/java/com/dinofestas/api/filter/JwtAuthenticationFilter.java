package com.dinofestas.api.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dinofestas.api.repository.AdminUserRepository;
import com.dinofestas.api.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    AdminUserRepository adminUserRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
        String path = request.getServletPath();

        // Permite acesso à rota de login sem autenticação
        if (path.equals("/admin/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // Se houver header de autorização, tentamos validar o token
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String token = authHeader.substring(7);  // Remove "Bearer " do token
            try {
                var username = jwtService.validateToken(token);

                // Se o token for válido e o contexto de segurança estiver vazio, autêntica o usuário
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    adminUserRepository.findByUsername(username)
                        .ifPresent(user -> {
                            var authentication = new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                user.getAuthorities()
                            );
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        });
                }
            } catch (Exception e) {
                // Em caso de erro (como token expirado), simplesmente não faz nada
                // E continua a requisição sem autenticar, o que permite a execução pública
            }
        }

        // Continua a requisição
        filterChain.doFilter(request, response);
    }
}
