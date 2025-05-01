package com.dinofestas.api.controller;

import org.springframework.web.bind.annotation.*;

import com.dinofestas.api.service.AuthService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*") // Deixa as requisições frontend acessarem
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody AuthRequest request) {
        String token = authService.authenticate(request.getUsername(), request.getPassword());
        return new TokenResponse(token);
    }
}

class AuthRequest {
    private String username;
    private String password;

    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class TokenResponse {
    private String token;

    public TokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
