package com.dinofestas.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categorias_disponiveis")
public class CategoriasDisponiveis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    public String getNome() {
      return this.nome;
    }

    public void setNome(String nome) {
      this.nome = nome;
    }
}
