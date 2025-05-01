package com.dinofestas.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Long quantidade;

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for nome
    public String getNome() {
        return nome;
    }

    // Setter for nome
    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter for quantidade
    public Long getQuantidade() {
        return quantidade;
    }

    // Setter for quantidade
    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }
}
