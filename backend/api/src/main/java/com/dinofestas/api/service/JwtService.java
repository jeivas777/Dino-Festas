package com.dinofestas.api.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.dinofestas.api.model.AdminUser;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${api.security.token.secret}")
    private static final String SECRET_KEY = "sua_chave_super_secreta_sua_chave_super_secreta"; 
    // precisa ter pelo menos 256 bits (32 caracteres) para HS256

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(AdminUser user) {
        try{
            return Jwts.builder()
            .setSubject(user.getUsername())
            .claim("id", user.getId())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 8 * 60 * 60 * 1000))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar o token JWT", e);
        }
    }

    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Token inválido ou expirado", e);
        }
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
