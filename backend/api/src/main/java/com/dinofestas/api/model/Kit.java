package com.dinofestas.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "kits")
public class Kit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @OneToMany
    @JoinColumn
    private List<Item> itens;

    private List<String> imagens;

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
// A classe Kit não precisa de um relacionamento explícito com Item

    // Construtor padrão
    public Kit() {}

    // Construtor com parâmetros
    public Kit(String nome) {
        this.nome = nome;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Item> getItens() {
        return itens;
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
    }
}
