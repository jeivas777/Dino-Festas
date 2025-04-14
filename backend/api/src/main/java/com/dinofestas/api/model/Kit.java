package com.dinofestas.api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.dinofestas.api.converter.JsonStringListConverter;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "kits")
public class Kit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @OneToMany(mappedBy = "kit", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Item> itens = new ArrayList<>();

    @Convert(converter = JsonStringListConverter.class)
    @Column(columnDefinition = "TEXT")
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
